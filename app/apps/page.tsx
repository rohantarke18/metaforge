"use client";

import { useEffect, useState } from "react";

interface AppData {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function AppsPage() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApps() {
      const res = await fetch("/api/apps");
      const data = await res.json();
      setApps(data);
      setLoading(false);
    }

    loadApps();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this application?")) return;

    await fetch(`/api/apps?id=${id}`, {
      method: "DELETE",
    });

    setApps((prev) => prev.filter((app) => app.id !== id));
  }

  if (loading) {
    return (
      <main className="p-10">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">
          My Applications
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h2 className="text-2xl font-bold">
                {app.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {app.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                {new Date(app.createdAt).toLocaleString()}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    window.location.href = `/apps/${app.id}`;
                  }}
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Open
                </button>

                <button
                  onClick={() => handleDelete(app.id)}
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}