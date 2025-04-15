export async function setLabelForOrganizersWithPeopleComponent(
  data,
  componentFieldName: string
) {
  const components = data[componentFieldName];
  if (!Array.isArray(components)) return;

  for (const item of components) {
    // Hvis bare id er tilgjengelig
    if (!item.id) continue;

    // Hent hele komponent-instansen fra DB
    const fullComponent = await strapi.db
      .query("component::event.organizer-with-people")
      .findOne({
        where: { id: item.id },
        populate: { organizer: true, people: true },
      });

    const organizerName = fullComponent?.organizer?.name || "Ukjent arrangør";
    const peopleCount = fullComponent?.people?.length || 0;

    // Sett label på det som skal lagres
    item.label = `${organizerName} – ${peopleCount} ${peopleCount === 1 ? "person" : "personer"}`;
  }
}
