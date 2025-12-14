import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConsultationTypes,
  createConsultationType,
  updateConsultationType,
  getTemplatesByType,
  createTemplateVersion,
  setActiveTemplate,
  getActiveTemplateByType,
  deleteTemplateVersion,
  deleteConsultationType,
  type ConsultationType,
  type Template,
} from "../endpoints/templateEndpoints";
import type { Patient } from "../endpoints/patientEndpoints";

export type { ConsultationType, Template, Patient };

export const useConsultationTypes = () => {
  return useQuery<ConsultationType[], Error>({
    queryKey: ["consultationTypes"],
    queryFn: getConsultationTypes,
  });
};

export const useCreateConsultationType = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ConsultationType,
    Error,
    { name: string; slug?: string; order?: number }
  >({
    mutationFn: createConsultationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationTypes"] });
    },
  });
};

export const useUpdateConsultationType = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ConsultationType,
    Error,
    { id: string; name: string; slug: string; order?: number }
  >({
    mutationFn: ({ id, ...updates }) => updateConsultationType(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationTypes"] });
    },
  });
};

export const useTemplatesByType = (typeId: string) => {
  return useQuery<Template[], Error>({
    queryKey: ["templates", typeId],
    queryFn: () => getTemplatesByType(typeId),
    enabled: !!typeId,
  });
};

export const useCreateTemplateVersion = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Template,
    Error,
    { typeId: string; version: string; structure: any; template: string }
  >({
    mutationFn: ({ typeId, structure, template }) =>
      createTemplateVersion(typeId, structure, template),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["templates", data.consultationTypeId],
      });
    },
  });
};

export const useSetActiveTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation<Template, Error, string>({
    mutationFn: setActiveTemplate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["templates", data.consultationTypeId],
      });
    },
  });
};

export const useActiveTemplateByType = (slug: string) => {
  return useQuery<Template | null, Error>({
    queryKey: ["activeTemplate", slug],
    queryFn: () => getActiveTemplateByType(slug),
    enabled: !!slug,
  });
};

export const useDeleteTemplateVersion = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteTemplateVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
};

export const useDeleteConsultationType = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteConsultationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationTypes"] });
    },
  });
};
