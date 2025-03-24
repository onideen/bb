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

export function formatDateTimeRange(start: string, end?: string): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const startStr = startDate.toLocaleDateString("nb-NO", {
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (endDate) {
    const endStr = endDate.toLocaleTimeString("nb-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startStr}–${endStr}`;
  }

  return startStr;
}
