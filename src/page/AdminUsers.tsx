import React, { useMemo } from "react";
import { Check, X, UserCog } from "lucide-react";
import {
  useUsers,
  useUpdateUserStatus,
  useUpdateUserChu,
} from "../hooks/useAdmin";
import { useChus } from "../hooks/useChus";
import Table from "../components/Table";
import Card from "../components/Card";
import Select from "../components/Select";
import Button from "../components/Button";

const AdminUsers: React.FC = () => {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: chus, isLoading: chusLoading } = useChus();
  const updateUserStatus = useUpdateUserStatus();
  const updateUserChu = useUpdateUserChu();

  const handleStatusChange = (userId: string, isActive: boolean) => {
    updateUserStatus.mutate({ userId, isActive });
  };

  const handleChuChange = (userId: string, chuId: string) => {
    updateUserChu.mutate({ userId, chuId });
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

  const columns = useMemo(
    () => [
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
      {
        header: "Role",
        accessor: (user: any) => (
          <span className="badge badge-ghost">{user.role}</span>
        ),
      },
      {
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
      },
      {
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
      },
      {
        header: "Actions",
        accessor: (user: any) => (
          <div className="flex gap-2">
            {!user.isActive ? (
              <Button
                variant="success"
                size="xs"
                onClick={() => handleStatusChange(user.id, true)}
                startIcon={Check}
                className="text-white"
              >
                Valider
              </Button>
            ) : (
              <Button
                variant="warning"
                size="xs"
                onClick={() => handleStatusChange(user.id, false)}
                startIcon={X}
                className="text-white"
              >
                Révoquer
              </Button>
            )}
          </div>
        ),
      },
    ],
    [chuOptions]
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <UserCog size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
          <p className="text-base-content/60">
            Gérez les accès et les affectations aux CHUs
          </p>
        </div>
      </div>

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
};

export default AdminUsers;
