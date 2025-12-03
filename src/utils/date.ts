export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "N/A";
  }
  try {
    const date = new Date(dateString);
    // Adjust for timezone offset to prevent off-by-one day errors
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(adjustedDate);
  } catch (error) {
    console.error("Invalid date format:", dateString, error);
    return "Date invalide";
  }
};
