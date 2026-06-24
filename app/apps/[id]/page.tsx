"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import Header from "@/components/Header";
import JsonEditor from "@/components/JsonEditor";
import PreviewPanel from "@/components/PreviewPanel";

import { Button } from "@/components/ui/button";
import { runRuntime } from "@/lib/runtime/runtime";

export default function AppDetails() {
  const params = useParams();
  const id = params.id;

  const [jsonText, setJsonText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadApp() {
      try {
        const res = await fetch("/api/apps");
        const apps = await res.json();

        const app = apps.find((a: any) => a.id === id);

        if (app) {
          setJsonText(JSON.stringify(app.config, null, 2));
        } else {
          toast.error("Application not found");
        }
      } catch {
        toast.error("Failed to load application");
      }
    }

    loadApp();
  }, [id]);

  const runtime = runRuntime(jsonText);

  async function saveChanges() {
    try {
      setSaving(true);

      const config = JSON.parse(jsonText);

      const res = await fetch("/api/apps", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: config.app?.name || "Untitled App",
          description: config.app?.description || "",
          config,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Application updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Invalid JSON or update failed");
    } finally {
      setSaving(false);
    }
  }

  if (!jsonText) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </main>
    );
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
            onClick={saveChanges}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </main>
  );
}