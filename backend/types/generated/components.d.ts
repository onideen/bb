import type { Schema, Struct } from '@strapi/strapi';

export interface DeltMedia extends Struct.ComponentSchema {
  collectionName: 'components_delt_media';
  info: {
    description: '';
    displayName: 'Media';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'videos'>;
  };
}

export interface DeltRikTekst extends Struct.ComponentSchema {
  collectionName: 'components_delt_rik_teksts';
  info: {
    description: '';
    displayName: 'Rik tekst';
  };
  attributes: {
    innhold: Schema.Attribute.Blocks;
  };
}

export interface DeltSlider extends Struct.ComponentSchema {
  collectionName: 'components_delt_sliders';
  info: {
    description: '';
    displayName: 'slider';
  };
  attributes: {
    filer: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rik tekst';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'delt.media': DeltMedia;
      'delt.rik-tekst': DeltRikTekst;
      'delt.slider': DeltSlider;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
