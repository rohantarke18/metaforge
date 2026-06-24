import ComponentRenderer from "@/components/componentRenderer/ComponentRenderer";

interface PageRendererProps {
  page: any;
}

export default function PageRenderer({
  page,
}: PageRendererProps) {
  if (!page) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6">
        ⚠ Invalid page configuration.
      </div>
    );
  }

  if (!page.title) {
    page.title = "Untitled Page";
  }

  if (!Array.isArray(page.components)) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {page.title}
        </h2>

        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
          ⚠ No components found on this page.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {page.title}
      </h2>

      <div className="space-y-4">
        {page.components.length === 0 ? (
          <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            ⚠ This page has no components.
          </div>
        ) : (
          page.components.map(
            (component: any, index: number) => (
              <ComponentRenderer
                key={index}
                component={component}
              />
            )
          )
        )}
      </div>
    </div>
  );
}