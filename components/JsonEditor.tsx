import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JsonEditor({
  value,
  onChange,
}: JsonEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Configuration</CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          className="min-h-[500px] font-mono"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}