import TextField from "@/components/fields/TextField";
import EmailField from "@/components/fields/EmailField";
import NumberField from "@/components/fields/NumberField";

import CardComponent from "@/components/components/CardComponent";
import TableComponent from "@/components/components/TableComponent";
import ButtonComponent from "@/components/components/ButtonComponent";

export const componentRegistry = {
  text: TextField,
  email: EmailField,
  number: NumberField,

  card: CardComponent,
  table: TableComponent,
  button: ButtonComponent,
};