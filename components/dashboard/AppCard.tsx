import Link from "next/link";

interface AppCardProps {
  app: any;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <h2 className="text-2xl font-bold">
        {app.name}
      </h2>

      <p className="mt-2 text-gray-500">
        {app.description}
      </p>

      <div className="mt-6">
        <Link
          href={`/editor/${app.id}`}
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Open
        </Link>
      </div>
    </div>
  );
}