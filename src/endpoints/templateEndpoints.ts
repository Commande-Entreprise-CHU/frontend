import axios from "axios";

const SERVER_URL =
  (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:5001";

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
  const { data } = await axios.get(`${SERVER_URL}/api/templates/types`);
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

  const { data } = await axios.post(`${SERVER_URL}/api/templates/types`, {
    name,
    slug: finalSlug,
    order,
  });
  return data;
};

export const updateConsultationType = async ({
  id,
  name,
  slug,
  order,
}: {
  id: string;
  name: string;
  slug: string;
  order?: number;
}): Promise<ConsultationType> => {
  const { data } = await axios.put(`${SERVER_URL}/api/templates/types/${id}`, {
    name,
    slug,
    order,
  });
  return data;
};

export const getTemplatesByType = async (
  typeId: string
): Promise<Template[]> => {
  const { data } = await axios.get(
    `${SERVER_URL}/api/templates/types/${typeId}/templates`
  );
  return data;
};

export const createTemplateVersion = async ({
  typeId,
  version,
  structure,
  template,
}: {
  typeId: string;
  version: string;
  structure: any;
  template: string;
}): Promise<Template> => {
  const { data } = await axios.post(
    `${SERVER_URL}/api/templates/types/${typeId}/templates`,
    { version, structure, template }
  );
  return data;
};

export const setActiveTemplate = async (
  templateId: string
): Promise<Template> => {
  const { data } = await axios.put(
    `${SERVER_URL}/api/templates/templates/${templateId}/active`
  );
  return data;
};

export const getActiveTemplateByType = async (
  slug: string
): Promise<Template> => {
  const { data } = await axios.get(
    `${SERVER_URL}/api/templates/active/${slug}`
  );
  return data;
};

export const deleteTemplateVersion = async (
  templateId: string
): Promise<void> => {
  await axios.delete(`${SERVER_URL}/api/templates/${templateId}`);
};
