import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageRenderer from "@/components/renderer/PageRenderer";

interface PreviewPanelProps {
  parsedConfig: any;
  error: string;
}

export default function PreviewPanel({
  parsedConfig,
  error,
}: PreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="min-h-[500px] rounded-lg border-2 border-dashed p-6 overflow-auto">

          {error ? (
            <p className="text-red-500 font-medium">
              {error}
            </p>
          ) : !parsedConfig?.pages ? (
            <p className="text-red-500 font-medium">
              Missing "pages" property.
            </p>
          ) : (
            <PageRenderer
              page={parsedConfig.pages[0]}
            />
          )}

        </div>
      </CardContent>
    </Card>
  );
}