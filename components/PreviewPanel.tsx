import { Monitor, RefreshCw, AlertTriangle, Eye, FileJson } from "lucide-react";
import PageRenderer from "@/components/renderer/PageRenderer";

interface PreviewPanelProps {
  parsedConfig: any;
  error: string;
  isEmpty?: boolean;
}

export default function PreviewPanel({ parsedConfig, error, isEmpty = false }: PreviewPanelProps) {
  const hasContent = !error && parsedConfig?.pages;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Browser chrome top bar */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-gray-300" />
          <span className="h-3 w-3 rounded-full bg-gray-300" />
          <span className="h-3 w-3 rounded-full bg-gray-300" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1.5 ring-1 ring-gray-200">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <span className="flex-1 truncate text-xs text-gray-400">
            preview://metaforge.app/live
          </span>
          <RefreshCw className="h-3 w-3 text-gray-400" />
        </div>
        <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1.5 ring-1 ring-gray-200">
          <Monitor className="h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      {/* Preview content */}
      <div className="min-h-[520px] flex-1 overflow-auto bg-white p-6">
        {isEmpty ? (
          /* No application loaded state */
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 ring-1 ring-violet-100">
              <FileJson className="h-7 w-7 text-violet-400" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-700">
                No Application Loaded
              </p>
              <p className="mt-1.5 max-w-[220px] text-xs text-gray-400 leading-relaxed">
                Paste your JSON configuration here or click{" "}
                <span className="font-medium text-violet-500">Load Sample</span>{" "}
                to get started.
              </p>
            </div>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-violet-200 bg-violet-50/50 px-4 py-2.5">
              <Eye className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs text-violet-500 font-medium">
                Live preview will appear here
              </span>
            </div>
          </div>
        ) : error ? (
          /* Error state */
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-red-100 bg-red-50 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-red-700">
                Configuration Error
              </p>
              <p className="mt-1 text-xs text-red-500">{error}</p>
            </div>
          </div>
        ) : !parsedConfig?.pages ? (
          /* Waiting / partial JSON state */
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 ring-1 ring-violet-100">
              <Eye className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Live Preview
              </p>
              <p className="mt-1 max-w-[200px] text-xs text-gray-400">
                Your app will appear here as you edit the JSON configuration
              </p>
            </div>
            <div className="flex gap-1.5">
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />
            </div>
          </div>
        ) : (
          /* Rendered pages */
          <div className="space-y-6">
            {parsedConfig.pages.map((page: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-50"
              >
                <PageRenderer page={page} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              hasContent ? "bg-green-400" : error ? "bg-red-400" : "bg-gray-300"
            }`}
          />
          <span className="text-[11px] text-gray-500">
            {isEmpty ? "No Application" : error ? "Error" : hasContent ? "Rendering" : "Waiting"}
          </span>
        </div>
        <span className="text-[11px] text-gray-400">Live Preview</span>
      </div>
    </div>
  );
}