import ComponentRenderer from "@/components/componentRenderer/ComponentRenderer";

interface PageRendererProps {
  page: any;
}

export default function PageRenderer({
  page,
}: PageRendererProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {page.title}
      </h2>

      <div className="space-y-4">
        {page.components?.map(
          (component: any, index: number) => (
            <ComponentRenderer
              key={index}
              component={component}
            />
          )
        )}
      </div>
    </div>
  );
}