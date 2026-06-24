import { componentRegistry } from "@/lib/registry/componentRegistry";

interface ComponentRendererProps {
  component: any;
}

export default function ComponentRenderer({
  component,
}: ComponentRendererProps) {
  if (!component) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
        ⚠ Invalid component configuration.
      </div>
    );
  }

  if (!component.type) {
    return (
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-700">
        ⚠ Component type is missing.
      </div>
    );
  }

  const Component =
    componentRegistry[
      component.type as keyof typeof componentRegistry
    ];

  if (!Component) {
    return (
      <div className="rounded-lg border border-orange-300 bg-orange-50 p-4">
        <p className="font-semibold text-orange-700">
          ⚠ Unknown Component
        </p>

        <p className="text-sm text-gray-600 mt-2">
          Type: <b>{component.type}</b>
        </p>
      </div>
    );
  }

  try {
    return <Component {...component} />;
  } catch (error) {
    console.error(error);

    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4">
        ⚠ Failed to render component.
      </div>
    );
  }
}