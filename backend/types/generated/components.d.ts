import type { Schema, Struct } from '@strapi/strapi';

export interface PageArticleList extends Struct.ComponentSchema {
  collectionName: 'components_page_article_lists';
  info: {
    description: '';
    displayName: 'article_list';
    icon: 'book';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::article-category.article-category'
    >;
    filter_type: Schema.Attribute.Enumeration<['siste', 'kategori']>;
    limit: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageContactList extends Struct.ComponentSchema {
  collectionName: 'components_page_contact_lists';
  info: {
    displayName: 'contact_list';
    icon: 'envelop';
  };
  attributes: {
    contacts: Schema.Attribute.Component<'shared.contact-entry', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PageEventList extends Struct.ComponentSchema {
  collectionName: 'components_page_event_lists';
  info: {
    description: '';
    displayName: 'event_list';
    icon: 'calendar';
  };
  attributes: {
    event_categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::event-category.event-category'
    >;
    filter_type: Schema.Attribute.Enumeration<['kommende', 'kategori']>;
    limit: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactEntry extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_entries';
  info: {
    description: '';
    displayName: 'contact_entry';
    icon: 'envelop';
  };
  attributes: {
    person: Schema.Attribute.Relation<'oneToOne', 'api::person.person'>;
    role: Schema.Attribute.String;
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
    innhold: Schema.Attribute.Blocks;
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
      'page.article-list': PageArticleList;
      'page.contact-list': PageContactList;
      'page.event-list': PageEventList;
      'shared.contact-entry': SharedContactEntry;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
