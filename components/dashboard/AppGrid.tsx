import AppCard from "./AppCard";
import EmptyState from "./EmptyState";

interface Props {
  apps: any[];
}

export default function AppGrid({ apps }: Props) {
  if (apps.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
        />
      ))}
    </div>
  );
}