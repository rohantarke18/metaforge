import { componentRegistry } from "@/lib/registry/componentRegistry";

interface ComponentRendererProps {
  component: any;
}

export default function ComponentRenderer({
  component,
}: ComponentRendererProps) {
  const Component =
    componentRegistry[
      component.type as keyof typeof componentRegistry
    ];

  if (!Component) {
    return (
      <p className="text-red-500">
        Unsupported component: {component.type}
      </p>
    );
  }

  return <Component {...component} />;
}