export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return capitalizeFirst(formatted);
}

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
