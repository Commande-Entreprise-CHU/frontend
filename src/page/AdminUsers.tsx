import { useMemo } from "react";
import { Check, X, UserCog } from "lucide-react";
import {
  useUsers,
  useUpdateUserStatus,
  useUpdateUserChu,
  useUpdateUserRole,
} from "../hooks/useAdmin";
import { useChus } from "../hooks/useChus";
import Table from "../components/Table";
import Card from "../components/Card";
import Select from "../components/form/Select";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../endpoints/adminEndpoints";

interface AdminUsersProps {
  isSubComponent?: boolean;
}

// Role labels in French
const roleLabels: Record<UserRole, string> = {
  master_admin: "Super Administrateur",
  chu_admin: "Administrateur CHU",
  doctor: "Médecin",
};

export default function AdminUsers({ isSubComponent = false }: AdminUsersProps) {
  const { isMasterAdmin } = useAuth();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: chus, isLoading: chusLoading } = useChus();
  const { showToast } = useToast();
  const updateUserStatus = useUpdateUserStatus();
  const updateUserChu = useUpdateUserChu();
  const updateUserRole = useUpdateUserRole();

  const handleStatusChange = (userId: string, isActive: boolean) => {
    updateUserStatus.mutate(
      { userId, isActive },
      {
        onSuccess: () => showToast("Statut utilisateur mis à jour", "success"),
        onError: () => showToast("Erreur lors de la mise à jour du statut", "error"),
      }
    );
  };

  const handleChuChange = (userId: string, chuId: string) => {
    updateUserChu.mutate(
      { userId, chuId },
      {
        onSuccess: () => showToast("Affection CHU mise à jour", "success"),
        onError: () => showToast("Erreur lors de la mise à jour du CHU", "error"),
      }
    );
  };

  const handleRoleChange = (userId: string, role: UserRole) => {
    updateUserRole.mutate(
      { userId, role },
      {
        onSuccess: () => showToast("Rôle utilisateur mis à jour", "success"),
        onError: () => showToast("Erreur lors de la mise à jour du rôle", "error"),
      }
    );
  };

  const chuOptions = useMemo(() => {
    if (!chus) return [];
    return [
      { value: "", label: "Aucun CHU" },
      ...chus.map((chu) => ({
        value: chu.id,
        label: `${chu.name} (${chu.city})`,
      })),
    ];
  }, [chus]);

  const roleOptions = useMemo(() => [
    { value: "doctor", label: roleLabels.doctor },
    { value: "chu_admin", label: roleLabels.chu_admin },
    { value: "master_admin", label: roleLabels.master_admin },
  ], []);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        header: "Nom",
        accessor: (user: any) => (
          <div className="font-bold">
            {user.nom} {user.prenom}
          </div>
        ),
      },
      {
        header: "Email",
        accessor: "email" as const,
      },
    ];

    // Role column - different display for Master Admin vs CHU Admin
    if (isMasterAdmin) {
      // Master Admin: Can edit all roles with full dropdown
      baseColumns.push({
        header: "Rôle",
        accessor: (user: any) => (
          <div className="w-full max-w-xs">
            <Select
              options={roleOptions}
              value={user.role || "doctor"}
              onChange={(val) => handleRoleChange(user.id, val as UserRole)}
              size="sm"
              fullWidth
            />
          </div>
        ),
      });
    } else {
      // CHU Admin: Can only edit doctors, show badge for others
      baseColumns.push({
        header: "Rôle",
        accessor: (user: any) => {
          // Show editable dropdown only for doctors
          if (user.role === "doctor") {
            return (
              <div className="w-full max-w-xs">
                <Select
                  options={[{ value: "doctor", label: roleLabels.doctor }]}
                  value="doctor"
                  onChange={(val) => handleRoleChange(user.id, val as UserRole)}
                  size="sm"
                  fullWidth
                />
              </div>
            );
          }
          // Show read-only badge for non-doctors
          return (
            <span className="badge badge-ghost">
              {roleLabels[user.role as UserRole] || user.role}
            </span>
          );
        },
      });
    }

    // CHU column - only for Master Admin
    if (isMasterAdmin) {
      baseColumns.push({
        header: "CHU",
        accessor: (user: any) => (
          <div className="w-full max-w-xs">
            <Select
              options={chuOptions}
              value={user.chuId || ""}
              onChange={(val) => handleChuChange(user.id, val)}
              size="sm"
              fullWidth
            />
          </div>
        ),
      });
    }

    // Status column
    baseColumns.push({
      header: "Statut",
      accessor: (user: any) =>
        user.isActive ? (
          <span className="badge badge-success gap-1 text-white">
            <Check size={12} /> Actif
          </span>
        ) : (
          <span className="badge badge-warning gap-1 text-white">
            <X size={12} /> En attente
          </span>
        ),
    });

    // Actions column
    baseColumns.push({
      header: "Actions",
      accessor: (user: any) => (
        <div className="flex gap-2">
          {!user.isActive ? (
            <Button
              variant="success"
              size="sm"
              onClick={() => handleStatusChange(user.id, true)}
              startIcon={Check}
              className="text-white"
            >
              Valider
            </Button>
          ) : (
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleStatusChange(user.id, false)}
              startIcon={X}
              className="text-white"
            >
              Révoquer
            </Button>
          )}
        </div>
      ),
    });

    return baseColumns;
  }, [chuOptions, roleOptions, isMasterAdmin]);

  return (
    <div className={isSubComponent ? "space-y-4" : "container mx-auto p-4 space-y-4"}>
      {!isSubComponent && (
        <PageHeader
          icon={UserCog}
          title="Gestion des Utilisateurs"
          subtitle="Gérez les accès et les affectations aux CHUs"
        />
      )}

      <Card className="shadow-lg">
        <Table
          columns={columns}
          data={users || []}
          keyField="id"
          isLoading={usersLoading || chusLoading}
          emptyMessage="Aucun utilisateur trouvé."
        />
      </Card>
    </div>
  );
}
