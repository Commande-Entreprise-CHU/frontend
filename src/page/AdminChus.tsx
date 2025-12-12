import React, { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { useChus, useCreateChu, useUpdateChu, useDeleteChu } from "../hooks/useChus";
import { type Chu } from "../endpoints/chuEndpoints";

const AdminChus: React.FC = () => {
  const { data: chus, isLoading } = useChus();
  const createChu = useCreateChu();
  const updateChu = useUpdateChu();
  const deleteChu = useDeleteChu();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChu, setEditingChu] = useState<Chu | null>(null);
  const [formData, setFormData] = useState({ name: "", city: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingChu) {
        await updateChu.mutateAsync({ id: editingChu.id, chu: formData });
      } else {
        await createChu.mutateAsync(formData);
      }
      setIsModalOpen(false);
      setEditingChu(null);
      setFormData({ name: "", city: "" });
    } catch (error) {
      console.error("Error saving CHU:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce CHU ?")) return;
    try {
      await deleteChu.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting CHU:", error);
    }
  };

  const openModal = (chu?: Chu) => {
    if (chu) {
      setEditingChu(chu);
      setFormData({ name: chu.name, city: chu.city });
    } else {
      setEditingChu(null);
      setFormData({ name: "", city: "" });
    }
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des CHUs</h1>
        <button onClick={() => openModal()} className="btn btn-primary gap-2">
          <Plus size={20} /> Nouveau CHU
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Ville</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {chus?.map((chu) => (
                  <tr key={chu.id}>
                    <td>{chu.name}</td>
                    <td>{chu.city}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(chu)}
                          className="btn btn-ghost btn-xs"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(chu.id)}
                          className="btn btn-ghost btn-xs text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {editingChu ? "Modifier le CHU" : "Nouveau CHU"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Nom</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control w-full mb-6">
                <label className="label">
                  <span className="label-text">Ville</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChus;
