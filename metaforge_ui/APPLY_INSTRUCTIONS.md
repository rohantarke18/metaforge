"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import appConfig from "@/data/sample-app.json";

import Header from "@/components/Header";
import JsonEditor from "@/components/JsonEditor";
import PreviewPanel from "@/components/PreviewPanel";

import { Button } from "@/components/ui/button";
import { runRuntime } from "@/lib/runtime/runtime";

export default function Home() {
  const router = useRouter();

  const [jsonText, setJsonText] = useState(
    JSON.stringify(appConfig, null, 2)
  );

  const [loading, setLoading] = useState(false);

  const runtime = runRuntime(jsonText);

  async function handleGenerate() {
    if (runtime.error) {
      toast.error(runtime.error);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/apps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: runtime.data.app.name,
          description: runtime.data.app.description,
          config: runtime.data,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(error);
        throw new Error("Save failed");
      }

      toast.success("Application saved successfully!");
      router.push("/apps");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Header />

      {/* Hero banner */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-100">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                JSON → App Runtime
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Application Editor
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Define your app structure in JSON and see it render instantly in the preview.
              </p>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              {runtime.error && (
                <div className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-100">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Invalid JSON</span>
                </div>
              )}
              <button
                onClick={handleGenerate}
                disabled={loading || !!runtime.error}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-violet-600 to-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-violet-700 transition-all duration-150 hover:from-violet-500 hover:to-violet-600 hover:shadow-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Generate App
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor / Preview split */}
      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <JsonEditor value={jsonText} onChange={setJsonText} />
            <PreviewPanel
              parsedConfig={runtime.data}
              error={runtime.error ?? ""}
            />
          </div>

          {/* Mobile generate button */}
          <div className="mt-5 flex justify-center sm:hidden">
            <button
              onClick={handleGenerate}
              disabled={loading || !!runtime.error}
              className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-violet-600 to-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:from-violet-500 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4" />
                  Generate App
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
