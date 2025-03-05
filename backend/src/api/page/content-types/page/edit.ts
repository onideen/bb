
  export default {
    modifyEditView({ layout }: { layout: any }) {
      const alwaysActiveFields = ["path", "title"];
  
      return {
        ...layout,
        sections: layout.sections.map((section: any) => ({
          ...section,
          fields: section.fields.map((field: any) => ({
            ...field,
            disabled: ({ modifiedData }) =>
              modifiedData.external === true && !alwaysActiveFields.includes(field.name),
            description: ({ modifiedData }) =>
              modifiedData.external && !alwaysActiveFields.includes(field.name)
                ? "Dette feltet er deaktivert fordi 'External' er valgt"
                : field.description,
          })),
        })),
      };
    },
  };