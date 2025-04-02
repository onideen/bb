import type { Schema, Struct } from '@strapi/strapi';

export interface EventOrganizerWithPeople extends Struct.ComponentSchema {
  collectionName: 'components_event_organizer_with_people';
  info: {
    description: '';
    displayName: 'organizer_with_people';
    icon: 'calendar';
  };
  attributes: {
    organizer: Schema.Attribute.Relation<
      'oneToOne',
      'api::organizer.organizer'
    >;
    people: Schema.Attribute.Component<'shared.person-with-role', true>;
  };
}

export interface NavbarNavbarElement extends Struct.ComponentSchema {
  collectionName: 'components_navbar_navbar_elements';
  info: {
    description: '';
    displayName: 'navbar_element';
  };
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      'api::category.category'
    >;
    filter_type: Schema.Attribute.Enumeration<['latest', 'featured']>;
    limit: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageContactList extends Struct.ComponentSchema {
  collectionName: 'components_page_contact_lists';
  info: {
    description: '';
    displayName: 'contact_list';
    icon: 'envelop';
  };
  attributes: {
    contacts: Schema.Attribute.Component<'shared.person-with-role', true>;
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
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    filter_type: Schema.Attribute.Enumeration<['upcoming', 'past']>;
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

export interface SharedPersonWithRole extends Struct.ComponentSchema {
  collectionName: 'components_person_person_with_roles';
  info: {
    displayName: 'person_with_role';
    icon: 'user';
  };
  attributes: {
    person: Schema.Attribute.Relation<'oneToOne', 'api::person.person'>;
    role: Schema.Attribute.String;
    show_contact_info: Schema.Attribute.Boolean;
    show_description: Schema.Attribute.Boolean;
    show_image: Schema.Attribute.Boolean;
    show_in_preview: Schema.Attribute.Boolean;
    show_role: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
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
      'event.organizer-with-people': EventOrganizerWithPeople;
      'navbar.navbar-element': NavbarNavbarElement;
      'page.article-list': PageArticleList;
      'page.contact-list': PageContactList;
      'page.event-list': PageEventList;
      'shared.contact-entry': SharedContactEntry;
      'shared.media': SharedMedia;
      'shared.person-with-role': SharedPersonWithRole;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
