import { useState, useMemo } from "react";
import DynamicForm from "../components/DynamicForm";
import { Edit, Trash2 } from "lucide-react";
import {
  useConsultationTypes,
  useTemplatesByType,
  useCreateConsultationType,
  useUpdateConsultationType,
  useCreateTemplateVersion,
  useSetActiveTemplate,
  useDeleteTemplateVersion,
} from "../hooks/templateHooks";
import type { ConsultationType } from "../endpoints/templateEndpoints";

// Helper to extract fields from JSON structure
const extractFieldsFromJson = (json: any): string[] => {
  const fields: string[] = [];
  if (!json || !json.sections) return fields;

  const processFields = (fieldList: any[]) => {
    fieldList.forEach((field) => {
      if (field.name) fields.push(field.name);
      if (field.options) {
        field.options.forEach((opt: any) => {
          if (opt.fields) processFields(opt.fields);
        });
      }
      if (field.fields) processFields(field.fields);
    });
  };

  json.sections.forEach((section: any) => {
    if (section.fields) processFields(section.fields);
  });

  return fields;
};

// Helper to extract variables from Handlebars template
const extractVarsFromTemplate = (template: string): string[] => {
  const vars = new Set<string>();
  // Regex to find {{var}} or {{#helper var}} or {{#if var}}
  // This is a simplified regex and might need tuning
  const regex = /{{(?:#\w+\s+)?([a-zA-Z0-9_]+)(?:\s+[^}]*)?}}/g;
  let match;
  while ((match = regex.exec(template)) !== null) {
    // Filter out common helpers if they are captured as the first group
    const captured = match[1];
    if (
      ![
        "if",
        "else",
        "each",
        "with",
        "unless",
        "log",
        "ifEgal",
        "maj",
        "min",
        "capitalize",
        "titlecase",
        "ifExists",
        "ifNotEgal",
        "default",
        "formatDate",
        "pluralize",
        "join",
        "wrap",
        "add",
        "subtract",
        "ifContains",
        "formatTeeth",
      ].includes(captured)
    ) {
      vars.add(captured);
    } else {
      // If the first word was a helper, try to capture the second word (argument)
      // This regex is a bit too simple for nested helpers, but good for basic checks
      const fullTag = match[0];
      const argMatch = fullTag.match(/{{(?:#\w+\s+)+([a-zA-Z0-9_]+)/);
      if (argMatch && argMatch[1]) {
        vars.add(argMatch[1]);
      }
    }
  }
  return Array.from(vars);
};

export default function TemplateManager() {
  const [selectedType, setSelectedType] = useState<ConsultationType | null>(
    null
  );

  const {
    data: types,
    isLoading: typesLoading,
    error: typesError,
  } = useConsultationTypes();

  const {
    data: templates,
    isLoading: templatesLoading,
    error: templatesError,
  } = useTemplatesByType(selectedType?.id || "");

  // New Type Form
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeSlug, setNewTypeSlug] = useState("");

  // Edit Type State
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  const [editTypeName, setEditTypeName] = useState("");
  const [editTypeSlug, setEditTypeSlug] = useState("");

  // New Template Form
  const [newVersion, setNewVersion] = useState("");
  const [newStructure, setNewStructure] = useState("");
  const [newTemplateStr, setNewTemplateStr] = useState("");

  // Tabs state
  const [activeTab, setActiveTab] = useState<"structure" | "template">(
    "structure"
  );
  const [showPreview, setShowPreview] = useState(false);

  const sortedTypes = useMemo(() => {
    if (!types) return [];
    return [...types].sort((a, b) => a.order - b.order);
  }, [types]);

  const { mutate: createType } = useCreateConsultationType();

  const handleCreateType = async (e: React.FormEvent) => {
    e.preventDefault();
    // Determine new order (last + 1)
    const maxOrder =
      sortedTypes.length > 0
        ? Math.max(...sortedTypes.map((t) => t.order || 0))
        : -1;

    createType(
      { name: newTypeName, slug: newTypeSlug, order: maxOrder + 1 },
      {
        onSuccess: () => {
          setNewTypeName("");
          setNewTypeSlug("");
        },
      }
    );
  };

  const { mutate: updateType } = useUpdateConsultationType();

  const handleSaveEditType = async () => {
    if (!editingTypeId) return;

    // Find current order to preserve it
    const currentType = types?.find((t) => t.id === editingTypeId);
    const currentOrder = currentType?.order;

    updateType(
      {
        id: editingTypeId,
        name: editTypeName,
        slug: editTypeSlug,
        order: currentOrder,
      },
      {
        onSuccess: () => {
          setEditingTypeId(null);
        },
      }
    );
  };

  const handleMoveType = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sortedTypes.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;

    const typeA = sortedTypes[index];
    const typeB = sortedTypes[targetIndex];

    // Swap orders logic
    // We will just swap their order values.
    // If orders are equal (e.g. 0), we assign them based on index.

    let newOrderA = typeB.order;
    let newOrderB = typeA.order;

    if (newOrderA === newOrderB) {
      newOrderA = targetIndex;
      newOrderB = index;
    }

    // Update both
    updateType({
      id: typeA.id,
      name: typeA.name,
      slug: typeA.slug,
      order: newOrderA,
    });
    updateType({
      id: typeB.id,
      name: typeB.name,
      slug: typeB.slug,
      order: newOrderB,
    });
  };

  const { mutate: createTemplate } = useCreateTemplateVersion();

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    let structureJson;
    try {
      structureJson = JSON.parse(newStructure);
    } catch (e) {
      alert("Invalid JSON structure");
      return;
    }

    createTemplate(
      {
        typeId: selectedType.id,
        version: newVersion,
        structure: structureJson,
        template: newTemplateStr,
      },
      {
        onSuccess: () => {
          setNewVersion("");
          setNewStructure("");
          setNewTemplateStr("");
          alert("Version créée avec succès !");
        },
      }
    );
  };

  const { mutate: activateTemplate } = useSetActiveTemplate();

  const handleActivate = async (templateId: string) => {
    activateTemplate(templateId);
  };

  const { mutate: deleteTemplate } = useDeleteTemplateVersion();

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette version ?")) {
      deleteTemplate(templateId);
    }
  };

  // Validation Logic
  const validationResult = useMemo(() => {
    let jsonFields: string[] = [];
    try {
      const json = JSON.parse(newStructure);
      jsonFields = extractFieldsFromJson(json);
    } catch {
      return null;
    }

    const templateVars = extractVarsFromTemplate(newTemplateStr);

    const missingInTemplate = jsonFields.filter(
      (f) => !templateVars.includes(f)
    );
    const missingInStructure = templateVars.filter(
      (v) => !jsonFields.includes(v)
    );

    return { missingInTemplate, missingInStructure };
  }, [newStructure, newTemplateStr]);

  const parsedStructure = useMemo(() => {
    try {
      return JSON.parse(newStructure);
    } catch {
      return null;
    }
  }, [newStructure]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Gestion des Modèles de Consultation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Types */}
        <div className="card bg-base-100 shadow border border-base-300 h-fit lg:col-span-1">
          <div className="card-body p-4">
            <h2 className="card-title text-lg">Types de Consultation</h2>
            {typesLoading ? (
              <p>Chargement...</p>
            ) : typesError ? (
              <p className="text-error">Erreur: {typesError.message}</p>
            ) : (
              <ul className="menu bg-base-200 w-full rounded-box p-2">
                {sortedTypes.map((type, index) => (
                  <li key={type.id} className="mb-1">
                    {editingTypeId === type.id ? (
                      <div className="flex flex-col gap-2 p-2 bg-base-100 border rounded">
                        <input
                          className="input input-xs input-bordered w-full"
                          value={editTypeName}
                          onChange={(e) => setEditTypeName(e.target.value)}
                        />
                        <input
                          className="input input-xs input-bordered w-full"
                          value={editTypeSlug}
                          onChange={(e) => setEditTypeSlug(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={handleSaveEditType}
                          >
                            OK
                          </button>
                          <button
                            className="btn btn-xs btn-ghost"
                            onClick={() => setEditingTypeId(null)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex justify-between items-center ${
                          selectedType?.id === type.id ? "active" : ""
                        }`}
                      >
                        <a
                          className="flex-1 truncate"
                          onClick={() => setSelectedType(type)}
                        >
                          {type.name}
                        </a>
                        <div className="flex gap-1">
                          <button
                            className="btn btn-xs btn-ghost px-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTypeId(type.id);
                              setEditTypeName(type.name);
                              setEditTypeSlug(type.slug);
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <div className="flex flex-col">
                            <button
                              className="btn btn-[10px] min-h-0 h-4 btn-ghost px-0 leading-none"
                              disabled={index === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveType(index, "up");
                              }}
                            >
                              ▲
                            </button>
                            <button
                              className="btn btn-[10px] min-h-0 h-4 btn-ghost px-0 leading-none"
                              disabled={index === sortedTypes.length - 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveType(index, "down");
                              }}
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="divider my-2">Nouveau Type</div>
            <form onSubmit={handleCreateType} className="space-y-2">
              <input
                type="text"
                placeholder="Nom (ex: Première Consult)"
                className="input input-bordered w-full input-sm"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Slug (ex: pre-consult)"
                className="input input-bordered w-full input-sm"
                value={newTypeSlug}
                onChange={(e) => setNewTypeSlug(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm w-full">
                Ajouter
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Templates */}
        <div className="lg:col-span-3 space-y-6">
          {selectedType ? (
            <>
              {/* Existing Versions List */}
              <div className="card bg-base-100 shadow border border-base-300">
                <div className="card-body p-4">
                  <h2 className="card-title text-lg">
                    Versions pour "{selectedType.name}"
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Version</th>
                          <th>Date</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {templatesLoading ? (
                          <tr>
                            <td colSpan={4} className="text-center">
                              Chargement...
                            </td>
                          </tr>
                        ) : templatesError ? (
                          <tr>
                            <td colSpan={4} className="text-center text-error">
                              Erreur: {templatesError.message}
                            </td>
                          </tr>
                        ) : templates && templates.length > 0 ? (
                          templates.map((tmpl) => (
                            <tr
                              key={tmpl.id}
                              className={tmpl.isActive ? "bg-base-200" : ""}
                            >
                              <td className="font-bold">{tmpl.version}</td>
                              <td>
                                {new Date(tmpl.createdAt).toLocaleDateString()}
                              </td>
                              <td>
                                {tmpl.isActive ? (
                                  <span className="badge badge-success badge-sm">
                                    Actif
                                  </span>
                                ) : (
                                  <span className="badge badge-ghost badge-sm">
                                    Inactif
                                  </span>
                                )}
                              </td>
                              <td>
                                {!tmpl.isActive && (
                                  <button
                                    className="btn btn-xs btn-outline btn-primary"
                                    onClick={() => handleActivate(tmpl.id)}
                                  >
                                    Activer
                                  </button>
                                )}
                                <button
                                  className="btn btn-xs btn-outline btn-secondary ml-2"
                                  onClick={() => {
                                    setNewVersion(tmpl.version); // Keep same version string to edit easily
                                    setNewStructure(
                                      JSON.stringify(tmpl.structure, null, 2)
                                    );
                                    setNewTemplateStr(tmpl.template);
                                  }}
                                >
                                  Charger
                                </button>
                                <button
                                  className="btn btn-xs btn-outline btn-error ml-2"
                                  onClick={() => handleDeleteTemplate(tmpl.id)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center text-gray-500"
                            >
                              Aucune version trouvée
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* New Version Editor */}
              <div className="card bg-base-100 shadow border border-base-300">
                <div className="card-body p-4">
                  <h2 className="card-title text-lg mb-4">
                    Éditeur de Version
                  </h2>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-bold">
                        Numéro de Version
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="ex: 1.3"
                      className="input input-bordered w-full max-w-xs"
                      value={newVersion}
                      onChange={(e) => setNewVersion(e.target.value)}
                    />
                  </div>

                  {/* Tabs */}
                  <div role="tablist" className="tabs tabs-lifted mb-4">
                    <a
                      role="tab"
                      className={`tab ${
                        activeTab === "structure" ? "tab-active" : ""
                      }`}
                      onClick={() => setActiveTab("structure")}
                    >
                      Structure JSON
                    </a>
                    <a
                      role="tab"
                      className={`tab ${
                        activeTab === "template" ? "tab-active" : ""
                      }`}
                      onClick={() => setActiveTab("template")}
                    >
                      Template Handlebars
                    </a>
                  </div>

                  {/* Tab Content */}
                  <div className="bg-base-100 border-base-300 rounded-b-box border p-4 min-h-[400px]">
                    {/* Structure Tab */}
                    {activeTab === "structure" && (
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <label className="label cursor-pointer gap-2">
                            <span className="label-text">Mode Aperçu</span>
                            <input
                              type="checkbox"
                              className="toggle toggle-primary"
                              checked={showPreview}
                              onChange={(e) => setShowPreview(e.target.checked)}
                            />
                          </label>
                        </div>

                        {showPreview ? (
                          <div className="border rounded p-4 bg-gray-50 min-h-[300px]">
                            {parsedStructure ? (
                              <DynamicForm
                                config={parsedStructure}
                                readOnly={true}
                                showTextGeneration={false}
                                submitButtonText="Aperçu (Bouton)"
                              />
                            ) : (
                              <div className="text-error">JSON invalide</div>
                            )}
                          </div>
                        ) : (
                          <textarea
                            className="textarea textarea-bordered w-full h-[400px] font-mono text-xs"
                            placeholder='{"metadata": ...}'
                            value={newStructure}
                            onChange={(e) => setNewStructure(e.target.value)}
                          ></textarea>
                        )}
                      </div>
                    )}

                    {/* Template Tab */}
                    {activeTab === "template" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        <div className="md:col-span-2">
                          <textarea
                            className="textarea textarea-bordered w-full h-[400px] font-mono text-xs"
                            placeholder="{{#if ...}}"
                            value={newTemplateStr}
                            onChange={(e) => setNewTemplateStr(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="md:col-span-1 bg-base-200 p-3 rounded text-sm overflow-y-auto max-h-[400px]">
                          <h3 className="font-bold mb-2">Validation</h3>
                          {validationResult ? (
                            <div className="space-y-4">
                              <div>
                                <div className="font-semibold text-warning mb-1">
                                  Manquant dans le Template (
                                  {validationResult.missingInTemplate.length})
                                </div>
                                {validationResult.missingInTemplate.length >
                                0 ? (
                                  <ul className="list-disc list-inside text-xs text-base-content/70">
                                    {validationResult.missingInTemplate.map(
                                      (f) => (
                                        <li key={f}>{f}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <div className="text-success text-xs">
                                    Tout est utilisé !
                                  </div>
                                )}
                              </div>

                              <div className="divider my-1"></div>

                              <div>
                                <div className="font-semibold text-error mb-1">
                                  Inconnu dans la Structure (
                                  {validationResult.missingInStructure.length})
                                </div>
                                {validationResult.missingInStructure.length >
                                0 ? (
                                  <ul className="list-disc list-inside text-xs text-base-content/70">
                                    {validationResult.missingInStructure.map(
                                      (v) => (
                                        <li key={v}>{v}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <div className="text-success text-xs">
                                    Aucune variable inconnue !
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-base-content/50 italic">
                              Ajoutez une structure JSON valide pour voir
                              l'analyse.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={handleCreateTemplate}
                      disabled={!newVersion || !newStructure || !newTemplateStr}
                    >
                      Enregistrer la version {newVersion}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info">
              Sélectionnez un type de consultation à gauche pour voir et gérer
              ses modèles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
