import { Button } from "@/components/ui/button";

export default function ButtonComponent({
  label,
}: any) {
  return (
    <Button className="w-full">
      {label}
    </Button>
  );
}