import api from "../utils/api";

export interface ConsultationType {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Template {
  id: string;
  consultationTypeId: string;
  version: string;
  structure: any;
  template: string;
  isActive: boolean;
  createdAt: string;
}

export const getConsultationTypes = async (): Promise<ConsultationType[]> => {
  const { data } = await api.get(`/api/templates/types`);
  return data;
};

export const createConsultationType = async ({
  name,
  slug,
  order,
}: {
  name: string;
  slug?: string;
  order?: number;
}): Promise<ConsultationType> => {
  // Generate slug if not provided
  const finalSlug =
    slug ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const { data } = await api.post(`/api/templates/types`, {
    name,
    slug: finalSlug,
    order,
  });
  return data;
};

export const updateConsultationType = async (
  id: string,
  updates: Partial<ConsultationType>
): Promise<ConsultationType> => {
  const { data } = await api.put(`/api/templates/types/${id}`, updates);
  return data;
};

export const getTemplatesByType = async (
  typeId: string
): Promise<Template[]> => {
  const { data } = await api.get(`/api/templates/types/${typeId}/templates`);
  return data;
};

export const createTemplateVersion = async (
  typeId: string,
  structure: any,
  template: string
): Promise<Template> => {
  const { data } = await api.post(`/api/templates/types/${typeId}/templates`, {
    structure,
    template,
  });
  return data;
};

export const setActiveTemplate = async (
  templateId: string
): Promise<Template> => {
  const { data } = await api.put(`/api/templates/${templateId}/active`);
  return data;
};

export const getActiveTemplateByType = async (
  typeId: string
): Promise<Template | null> => {
  try {
    const { data } = await api.get(`/api/templates/types/${typeId}/active`);
    return data;
  } catch (error) {
    return null;
  }
};

export const deleteTemplateVersion = async (
  templateId: string
): Promise<void> => {
  await api.delete(`/api/templates/${templateId}`);
};
