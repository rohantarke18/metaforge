import { Input } from "@/components/ui/input";

interface EmailFieldProps {
  label: string;
  required?: boolean;
}

export default function EmailField({
  label,
  required,
}: EmailFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <Input
        type="email"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}