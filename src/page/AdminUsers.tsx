import React from "react";
import { Check, X } from "lucide-react";
import { useUsers, useUpdateUserStatus, useUpdateUserChu } from "../hooks/useAdmin";
import { useChus } from "../hooks/useChus";

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

  if (usersLoading || chusLoading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>CHU</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="font-bold">
                        {user.nom} {user.prenom}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <select
                        className="select select-bordered select-sm w-full max-w-xs"
                        value={user.chuId || ""}
                        onChange={(e) => handleChuChange(user.id, e.target.value)}
                      >
                        <option value="">Aucun CHU</option>
                        {chus?.map((chu) => (
                          <option key={chu.id} value={chu.id}>
                            {chu.name} ({chu.city})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {user.isActive ? (
                        <span className="badge badge-success">Actif</span>
                      ) : (
                        <span className="badge badge-warning">En attente</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {!user.isActive && (
                          <button
                            onClick={() => handleStatusChange(user.id, true)}
                            className="btn btn-success btn-xs text-white"
                          >
                            <Check size={14} /> Valider
                          </button>
                        )}
                        {user.isActive && (
                          <button
                            onClick={() => handleStatusChange(user.id, false)}
                            className="btn btn-warning btn-xs text-white"
                          >
                            <X size={14} /> Révoquer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
