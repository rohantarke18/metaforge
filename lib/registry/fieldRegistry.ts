import TextField from "@/components/fields/TextField";
import EmailField from "@/components/fields/EmailField";
import NumberField from "@/components/fields/NumberField";

export const fieldRegistry = {
  text: TextField,
  email: EmailField,
  number: NumberField,
};