export default {
  modifyEditView({ layout }) {
    const alwaysActiveFields = ["path", "title"]; // 🚀 Disse feltene skal alltid være aktivert
    console.log("EDIT: EREKJRLNLKFD")
    return {
      ...layout,
      sections: layout.sections.map((section) => ({
        ...section,
        fields: section.fields.map((field) => {
          return {
            ...field,
            disabled: ({ modifiedData }) => {
              console.log("modifiedData:", modifiedData); // 🚀 Debugging
              return modifiedData?.external === true && !alwaysActiveFields.includes(field.name);
            },
            description: ({ modifiedData }) =>
              modifiedData?.external && !alwaysActiveFields.includes(field.name)
                ? "Dette feltet er deaktivert fordi 'External' er valgt"
                : field.description || "",
          };
        }),
      })),
    };
  },
};
