import { fieldRegistry } from "@/lib/registry/fieldRegistry";

interface Field {
  type: string;
  label: string;
  required?: boolean;
}

interface FormRendererProps {
  fields: Field[];
}

export default function FormRenderer({ fields }: FormRendererProps) {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => {
        const Component =
          fieldRegistry[field.type as keyof typeof fieldRegistry];

        if (!Component) {
          return (
            <p key={index} className="text-red-500">
              Unsupported field: {field.type}
            </p>
          );
        }

        return (
          <Component
            key={index}
            label={field.label}
            required={field.required}
          />
        );
      })}
    </div>
  );
}