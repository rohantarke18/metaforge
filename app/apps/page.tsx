"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppWindow,
  Search,
  Trash2,
  ExternalLink,
  Loader2,
  Plus,
  Calendar,
  LayoutGrid,
  AlertCircle,
  Boxes,
} from "lucide-react";
import { toast } from "sonner";

import Header from "@/components/Header";

interface AppData {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

const APP_COLORS = [
  "from-violet-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
  "from-pink-500 to-purple-600",
  "from-amber-500 to-orange-600",
];

function getColor(id: string) {
  const n = id.charCodeAt(0) % APP_COLORS.length;
  return APP_COLORS[n];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function AppsPage() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function loadApps() {
      try {
        const res = await fetch("/api/apps");
        const data = await res.json();
        setApps(data);
      } catch {
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    }
    loadApps();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this application? This cannot be undone.")) return;

    setDeleting(id);
    try {
      await fetch(`/api/apps?id=${id}`, { method: "DELETE" });
      setApps((prev) => prev.filter((app) => app.id !== id));
      toast.success("Application deleted");
    } catch {
      toast.error("Failed to delete application");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      (app.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const thisWeek = apps.filter((app) => {
    const d = new Date(app.createdAt);
    const now = new Date();
    return now.getTime() - d.getTime() < 7 * 24 * 60 * 60 * 1000;
  }).length;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#fafafa]">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 ring-1 ring-violet-100">
              <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
            </div>
            <p className="text-sm text-gray-500">Loading your applications…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Header />

      {/* Page header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                My Applications
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage, edit, and launch your generated applications.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-b from-violet-600 to-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-violet-700 transition-all duration-150 hover:from-violet-500 hover:to-violet-600 hover:shadow-violet-200 sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              New App
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                  <Boxes className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Apps</p>
                  <p className="text-xl font-bold text-gray-900">{apps.length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">This Week</p>
                  <p className="text-xl font-bold text-gray-900">{thisWeek}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <LayoutGrid className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Showing</p>
                  <p className="text-xl font-bold text-gray-900">{filtered.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications…"
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>

          {/* App grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 ring-1 ring-violet-100">
                <AppWindow className="h-8 w-8 text-violet-400" />
              </div>
              <p className="mt-4 text-base font-semibold text-gray-700">
                {search ? "No apps match your search" : "No applications yet"}
              </p>
              <p className="mt-1 max-w-xs text-sm text-gray-400">
                {search
                  ? "Try a different search term."
                  : "Head to the editor to create and save your first app."}
              </p>
              {!search && (
                <Link
                  href="/"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-violet-600 to-violet-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:from-violet-500 hover:to-violet-600"
                >
                  <Plus className="h-4 w-4" />
                  Create your first app
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((app) => (
                <div
                  key={app.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-100"
                >
                  {/* Card accent top */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${getColor(app.id)}`}
                  />

                  <div className="flex flex-1 flex-col p-5">
                    {/* Icon + name */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getColor(app.id)} text-sm font-bold text-white shadow-sm`}
                      >
                        {getInitials(app.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-[15px] font-semibold text-gray-900">
                          {app.name}
                        </h2>
                        {app.description && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                            {app.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date badge */}
                    <div className="mt-4 flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-gray-300" />
                      <span className="text-[11px] text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="mt-4 border-t border-gray-50" />

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/apps/${app.id}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open
                      </Link>
                      <button
                        onClick={() => handleDelete(app.id)}
                        disabled={deleting === app.id}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deleting === app.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
