import { Code2 } from "lucide-react";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-[#2d2d2d] bg-[#1e1e1e] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-400">
              config.json
            </span>
          </div>
        </div>
        <span className="rounded bg-[#2d2d2d] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500">
          JSON
        </span>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 bg-[#1e1e1e]">
        {/* Line numbers column */}
        <div className="flex h-full">
          {value && (
            <div className="hidden select-none border-r border-[#2d2d2d] bg-[#1e1e1e] px-3 py-4 text-right sm:block">
              {value.split("\n").map((_, i) => (
                <div
                  key={i}
                  className="font-mono text-xs leading-6 text-[#858585]"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <textarea
            className="min-h-[520px] w-full flex-1 resize-none bg-[#1e1e1e] p-4 font-mono text-sm leading-6 text-[#d4d4d4] outline-none placeholder:text-[#858585] scrollbar-thin"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            placeholder="Paste your JSON configuration here..."
            style={{
              caretColor: "#aeafad",
              tabSize: 2,
            }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-[#2d2d2d] bg-[#007acc] px-4 py-1">
        <span className="text-[11px] text-white/80">JSON Configuration</span>
        <span className="text-[11px] text-white/80">
          {value ? `${value.split("\n").length} lines` : "Empty"}
        </span>
      </div>
    </div>
  );
}