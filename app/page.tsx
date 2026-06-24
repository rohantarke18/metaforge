"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      alert(runtime.error);
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

      alert("✅ Application Saved Successfully!");

      router.push("/apps");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="grid gap-6 lg:grid-cols-2">
          <JsonEditor
            value={jsonText}
            onChange={setJsonText}
          />

          <PreviewPanel
            parsedConfig={runtime.data}
            error={runtime.error ?? ""}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Application"}
          </Button>
        </div>
      </div>
    </main>
  );
}