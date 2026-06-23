"use client";

import { useState } from "react";

import appConfig from "@/data/sample-app.json";

import Header from "@/components/Header";
import JsonEditor from "@/components/JsonEditor";
import PreviewPanel from "@/components/PreviewPanel";

import { Button } from "@/components/ui/button";
import { runRuntime } from "@/lib/runtime/runtime";

export default function Home() {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(appConfig, null, 2)
  );

  // Run the MetaForge Runtime
  const runtime = runRuntime(jsonText);

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
          <Button size="lg">
            Generate Application
          </Button>
        </div>
      </div>
    </main>
  );
}