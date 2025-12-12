import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Check } from "lucide-react";

interface PendingUser {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  createdAt: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/auth/approve/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUsers(users.filter((u) => u.id !== userId));
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Comptes en attente de validation</h2>

          {users.length === 0 ? (
            <p className="text-gray-500">Aucun utilisateur en attente.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Date d'inscription</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="font-bold">
                          {user.nom} {user.prenom}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="btn btn-success btn-sm gap-2 text-white"
                        >
                          <Check size={16} />
                          Valider
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
