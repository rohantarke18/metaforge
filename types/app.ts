export interface Field {
  type: string;
  label: string;
  name: string;
  required?: boolean;
}

export interface Page {
  type: string;
  title: string;
  fields: Field[];
}

export interface AppConfig {
  app: {
    name: string;
    description: string;
  };

  pages: Page[];
}