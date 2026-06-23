import { Input } from "@/components/ui/input";

interface NumberFieldProps {
  label: string;
  required?: boolean;
}

export default function NumberField({
  label,
  required,
}: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <Input
        type="number"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}