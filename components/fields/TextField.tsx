import { Input } from "@/components/ui/input";

interface TextFieldProps {
  label: string;
  required?: boolean;
}

export default function TextField({
  label,
  required,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <Input placeholder={`Enter ${label}`} />
    </div>
  );
}