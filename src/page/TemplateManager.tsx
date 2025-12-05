import { useState, useMemo, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  FileJson,
  FileCode,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Check,
  AlertCircle,
} from "lucide-react";
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
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
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

  // Load active template when templates change (e.g. type switch)
  useEffect(() => {
    if (templates) {
      const activeTemplate = templates.find((t) => t.isActive);
      if (activeTemplate) {
        setNewVersion(activeTemplate.version);
        setNewStructure(JSON.stringify(activeTemplate.structure, null, 2));
        setNewTemplateStr(activeTemplate.template);
        setSelectedTemplateId(activeTemplate.id);
      } else {
        setNewVersion("");
        setNewStructure("");
        setNewTemplateStr("");
        setSelectedTemplateId(null);
      }
    }
  }, [templates]);

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
              <div className="flex justify-center py-4">
                <span className="loading loading-spinner loading-md text-primary"></span>
              </div>
            ) : typesError ? (
              <div className="alert alert-error text-sm p-2">
                <span>Erreur: {typesError.message}</span>
              </div>
            ) : (
              <ul className="menu bg-base-200/50 w-full rounded-xl p-2 gap-1">
                {sortedTypes.map((type, index) => (
                  <li key={type.id}>
                    {editingTypeId === type.id ? (
                      <div className="flex flex-col gap-2 p-3 bg-base-100 border border-primary/20 rounded-lg shadow-sm">
                        <Input
                          name="editTypeName"
                          value={editTypeName}
                          onChange={(e) => setEditTypeName(e.target.value)}
                          placeholder="Nom"
                          className="w-full"
                        />
                        <Input
                          name="editTypeSlug"
                          value={editTypeSlug}
                          onChange={(e) => setEditTypeSlug(e.target.value)}
                          placeholder="Slug"
                          className="w-full"
                        />
                        <div className="flex gap-2 justify-end w-full">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => setEditingTypeId(null)}
                            icon={X}
                          >
                            Annuler
                          </Button>
                          <Button
                            variant="success"
                            size="xs"
                            onClick={handleSaveEditType}
                            icon={Save}
                          >
                            OK
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex justify-between items-center rounded-lg px-3 py-2 transition-all ${
                          selectedType?.id === type.id
                            ? "bg-primary text-primary-content shadow-md"
                            : "hover:bg-base-300"
                        }`}
                      >
                        <a
                          className="flex-1 truncate cursor-pointer font-medium"
                          onClick={() => setSelectedType(type)}
                        >
                          {type.name}
                        </a>
                        <div className="flex gap-1 items-center">
                          <button
                            className={`btn btn-xs btn-ghost btn-square ${
                              selectedType?.id === type.id
                                ? "text-primary-content hover:bg-primary-focus"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTypeId(type.id);
                              setEditTypeName(type.name);
                              setEditTypeSlug(type.slug);
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          <div className="flex flex-col gap-0.5">
                            <button
                              className={`btn btn-[10px] min-h-0 h-3.5 btn-ghost px-0 leading-none ${
                                selectedType?.id === type.id
                                  ? "text-primary-content hover:bg-primary-focus"
                                  : ""
                              }`}
                              disabled={index === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveType(index, "up");
                              }}
                            >
                              <ArrowUp size={10} />
                            </button>
                            <button
                              className={`btn btn-[10px] min-h-0 h-3.5 btn-ghost px-0 leading-none ${
                                selectedType?.id === type.id
                                  ? "text-primary-content hover:bg-primary-focus"
                                  : ""
                              }`}
                              disabled={index === sortedTypes.length - 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveType(index, "down");
                              }}
                            >
                              <ArrowDown size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="divider my-4 text-xs font-medium text-base-content/50">
              NOUVEAU TYPE
            </div>
            <form onSubmit={handleCreateType} className="space-y-3">
              <Input
                name="newTypeName"
                placeholder="Nom (ex: Première Consult)"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                required
              />
              <Input
                name="newTypeSlug"
                placeholder="Slug (ex: pre-consult)"
                value={newTypeSlug}
                onChange={(e) => setNewTypeSlug(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
                icon={Plus}
              >
                Ajouter
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Templates */}
        <div className="lg:col-span-3 space-y-6">
          {selectedType ? (
            <>
              {/* Existing Versions List */}
              <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-lg flex items-center gap-2">
                      <FileJson className="w-5 h-5 text-primary" />
                      Versions pour "{selectedType.name}"
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {templatesLoading ? (
                      <div className="flex justify-center py-8">
                        <span className="loading loading-spinner loading-md text-primary"></span>
                      </div>
                    ) : templatesError ? (
                      <div className="alert alert-error text-sm">
                        <AlertCircle size={16} />
                        <span>Erreur: {templatesError.message}</span>
                      </div>
                    ) : templates && templates.length > 0 ? (
                      templates.map((tmpl) => (
                        <div
                          key={tmpl.id}
                          className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                            tmpl.isActive
                              ? "bg-base-100 border-primary/30 shadow-sm"
                              : "bg-base-100 border-base-200 hover:border-base-300"
                          } ${
                            selectedTemplateId === tmpl.id
                              ? "ring-2 ring-primary ring-offset-2"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                tmpl.isActive
                                  ? "bg-primary/10 text-primary"
                                  : "bg-base-200 text-base-content/50"
                              }`}
                            >
                              {tmpl.isActive ? (
                                <CheckCircle2 size={20} />
                              ) : (
                                <FileCode size={20} />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-base">
                                  v{tmpl.version}
                                </span>
                                {tmpl.isActive && (
                                  <span className="badge badge-primary badge-sm">
                                    Actif
                                  </span>
                                )}
                                {selectedTemplateId === tmpl.id && (
                                  <span className="badge badge-ghost badge-sm animate-pulse">
                                    Édition
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-base-content/60 mt-0.5">
                                Créé le{" "}
                                {new Date(tmpl.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            {!tmpl.isActive && (
                              <div
                                className="tooltip tooltip-left"
                                data-tip="Activer cette version"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="btn-square text-success hover:bg-success/10"
                                  onClick={() => handleActivate(tmpl.id)}
                                >
                                  <Check size={18} />
                                </Button>
                              </div>
                            )}
                            <div
                              className="tooltip tooltip-left"
                              data-tip="Éditer / Voir"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="btn-square text-primary hover:bg-primary/10"
                                onClick={() => {
                                  setNewVersion(tmpl.version);
                                  setNewStructure(
                                    JSON.stringify(tmpl.structure, null, 2)
                                  );
                                  setNewTemplateStr(tmpl.template);
                                  setSelectedTemplateId(tmpl.id);
                                }}
                              >
                                <Edit size={18} />
                              </Button>
                            </div>
                            <div
                              className="tooltip tooltip-left"
                              data-tip="Supprimer"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="btn-square text-error hover:bg-error/10"
                                onClick={() => handleDeleteTemplate(tmpl.id)}
                              >
                                <Trash2 size={18} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-base-200/30 rounded-xl border border-dashed border-base-300">
                        <FileJson className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
                        <p className="text-base-content/50 font-medium">
                          Aucune version trouvée pour ce type.
                        </p>
                        <p className="text-xs text-base-content/40 mt-1">
                          Créez une nouvelle version ci-dessous.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* New Version Editor */}
              <div className="card bg-base-100 shadow border border-base-300">
                <div className="card-body p-4">
                  <h2 className="card-title text-lg mb-4">
                    Éditeur de Version
                  </h2>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-medium">
                        Numéro de Version
                      </span>
                    </label>
                    <Input
                      name="version"
                      type="text"
                      placeholder="ex: 1.3"
                      value={newVersion}
                      onChange={(e) => setNewVersion(e.target.value)}
                      className="w-full max-w-xs"
                    />
                  </div>

                  {/* Tabs */}
                  <div role="tablist" className="tabs tabs-lifted tabs-lg mb-0">
                    <a
                      role="tab"
                      className={`tab font-medium ${
                        activeTab === "structure"
                          ? "tab-active text-primary"
                          : ""
                      }`}
                      onClick={() => setActiveTab("structure")}
                    >
                      <FileJson className="w-4 h-4 mr-2" />
                      Structure JSON
                    </a>
                    <a
                      role="tab"
                      className={`tab font-medium ${
                        activeTab === "template"
                          ? "tab-active text-primary"
                          : ""
                      }`}
                      onClick={() => setActiveTab("template")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Template Handlebars
                    </a>
                  </div>

                  {/* Tab Content */}
                  <div className="bg-base-100 border-base-300 rounded-b-box border p-6 min-h-[500px]">
                    {/* Structure Tab */}
                    {activeTab === "structure" && (
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <label className="label cursor-pointer gap-2 select-none">
                            <span className="label-text font-medium">
                              Mode Aperçu
                            </span>
                            <input
                              type="checkbox"
                              className="toggle toggle-primary toggle-sm"
                              checked={showPreview}
                              onChange={(e) => setShowPreview(e.target.checked)}
                            />
                          </label>
                        </div>

                        {showPreview ? (
                          <div className="border border-base-300 rounded-lg p-6 bg-base-50 min-h-[400px] shadow-inner">
                            {parsedStructure ? (
                              <DynamicForm
                                config={parsedStructure}
                                readOnly={true}
                                showTextGeneration={false}
                                submitButtonText="Aperçu (Bouton)"
                              />
                            ) : (
                              <div className="alert alert-error">
                                <AlertCircle className="w-5 h-5" />
                                <span>JSON invalide</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <textarea
                            className="textarea textarea-bordered w-full h-[500px] font-mono text-sm leading-relaxed"
                            placeholder='{"metadata": ...}'
                            value={newStructure}
                            onChange={(e) => setNewStructure(e.target.value)}
                          ></textarea>
                        )}
                      </div>
                    )}

                    {/* Template Tab */}
                    {activeTab === "template" && (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                        <div className="lg:col-span-2">
                          <textarea
                            className="textarea textarea-bordered w-full h-[500px] font-mono text-sm leading-relaxed"
                            placeholder="{{#if ...}}"
                            value={newTemplateStr}
                            onChange={(e) => setNewTemplateStr(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="lg:col-span-1 bg-base-200/50 p-4 rounded-lg border border-base-200 overflow-y-auto max-h-[500px]">
                          <h3 className="font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            Validation
                          </h3>
                          {validationResult ? (
                            <div className="space-y-6">
                              <div>
                                <div className="font-semibold text-warning mb-2 text-sm flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  Manquant dans le Template (
                                  {validationResult.missingInTemplate.length})
                                </div>
                                {validationResult.missingInTemplate.length >
                                0 ? (
                                  <ul className="menu menu-xs bg-base-100 rounded-box p-2 border border-base-200">
                                    {validationResult.missingInTemplate.map(
                                      (f) => (
                                        <li key={f}>
                                          <span className="text-base-content/70">
                                            {f}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <div className="text-xs text-success flex items-center gap-1 pl-6">
                                    <Check className="w-3 h-3" /> Aucun champ
                                    manquant
                                  </div>
                                )}
                              </div>

                              <div className="divider my-1"></div>

                              <div>
                                <div className="font-semibold text-warning mb-2 text-sm flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  Manquant dans la Structure (
                                  {validationResult.missingInStructure.length})
                                </div>
                                {validationResult.missingInStructure.length >
                                0 ? (
                                  <ul className="menu menu-xs bg-base-100 rounded-box p-2 border border-base-200">
                                    {validationResult.missingInStructure.map(
                                      (v) => (
                                        <li key={v}>
                                          <span className="text-base-content/70">
                                            {v}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <div className="text-xs text-success flex items-center gap-1 pl-6">
                                    <Check className="w-3 h-3" /> Aucun champ
                                    manquant
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-base-content/50 italic text-center py-8">
                              Modifiez la structure ou le template pour voir la
                              validation.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-6 border-t border-base-200 mt-6">
                    <Button
                      variant="primary"
                      onClick={handleCreateTemplate}
                      disabled={!newVersion || !newStructure || !newTemplateStr}
                      icon={Save}
                      className="min-w-[150px]"
                    >
                      Enregistrer la version
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info shadow-sm">
              <AlertCircle className="w-5 h-5" />
              <span>
                Sélectionnez un type de consultation pour voir et gérer les
                versions.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
