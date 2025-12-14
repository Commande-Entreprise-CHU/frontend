import { useState, useMemo, type FormEvent } from "react";
import { Plus, Trash2, Edit, Building2 } from "lucide-react";
import {
  useChus,
  useCreateChu,
  useUpdateChu,
  useDeleteChu,
} from "../hooks/useChus";
import { type Chu } from "../endpoints/chuEndpoints";
import Table from "../components/Table";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import PageHeader from "../components/PageHeader";
import { useToast } from "../context/ToastContext";
interface AdminChusProps {
  isSubComponent?: boolean;
}

export default function AdminChus({ isSubComponent = false }: AdminChusProps) {
  const { data: chus, isLoading } = useChus();
  const createChu = useCreateChu();
  const updateChu = useUpdateChu();
  const deleteChu = useDeleteChu();

  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChu, setEditingChu] = useState<Chu | null>(null);
  const [formData, setFormData] = useState({ name: "", city: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingChu) {
        await updateChu.mutateAsync(
          { id: editingChu.id, chu: formData },
          {
            onSuccess: () => showToast("CHU modifié avec succès", "success"),
          }
        );
      } else {
        await createChu.mutateAsync(formData, {
          onSuccess: () => showToast("CHU créé avec succès", "success"),
        });
      }
      setIsModalOpen(false);
      setEditingChu(null);
      setFormData({ name: "", city: "" });
    } catch (error) {
      showToast("Erreur lors de l'enregistrement du CHU", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce CHU ?")) return;
    try {
      await deleteChu.mutateAsync(id, {
        onSuccess: () => showToast("CHU supprimé avec succès", "success"),
      });
    } catch (error) {
      showToast("Erreur lors de la suppression du CHU", "error");
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

  const handleInputChange = (data: { name: string; value: string | null }) => {
    setFormData((prev) => ({ ...prev, [data.name]: data.value || "" }));
  };

  const columns = useMemo(
    () => [
      {
        header: "Nom",
        accessor: "name" as const,
      },
      {
        header: "Ville",
        accessor: "city" as const,
      },
      {
        header: "Actions",
        accessor: (chu: Chu) => (
          <div className="flex gap-2">
            <IconButton
              icon={Edit}
              variant="ghost"
              size="sm"
              onClick={() => openModal(chu)}
              tooltip="Modifier"
            />
            <IconButton
              icon={Trash2}
              variant="ghost"
              size="sm"
              colorClass="text-error"
              onClick={() => handleDelete(chu.id)}
              tooltip="Supprimer"
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className={isSubComponent ? "space-y-4" : "container mx-auto p-6 space-y-6"}>
      {!isSubComponent && (
        <PageHeader
          icon={Building2}
          title="Gestion des CHUs"
          subtitle="Ajoutez et modifiez les établissements"
          actions={
            <Button onClick={() => openModal()} startIcon={Plus}>
              Nouveau CHU
            </Button>
          }
        />
      )}

      {isSubComponent && (
        <div className="flex justify-end mb-4">
           <Button onClick={() => openModal()} startIcon={Plus} size="sm">
              Nouveau CHU
            </Button>
        </div>
      )}

      <Card className="shadow-lg">
        <Table
          columns={columns}
          data={chus || []}
          keyField="id"
          isLoading={isLoading}
          emptyMessage="Aucun CHU trouvé."
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingChu ? "Modifier le CHU" : "Nouveau CHU"}
        actions={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              loading={createChu.isPending || updateChu.isPending}
            >
              Enregistrer
            </Button>
          </>
        }
      >
        <form id="chu-form" onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom"
            name="name"
            value={formData.name}
            setFormData={handleInputChange}
            required
            placeholder="Ex: CHU Nantes"
          />
          <Input
            label="Ville"
            name="city"
            value={formData.city}
            setFormData={handleInputChange}
            required
            placeholder="Ex: Nantes"
          />
        </form>
      </Modal>
    </div>
  );
};


