import FormRenderer from "./FormRenderer";

interface PageRendererProps {
  page: any;
}

export default function PageRenderer({
  page,
}: PageRendererProps) {

  switch (page.type) {

    case "form":
      return (
        <FormRenderer
          fields={page.fields}
        />
      );

    default:
      return (
        <p className="text-red-500">
          Unsupported page type: {page.type}
        </p>
      );
  }
}