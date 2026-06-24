"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import { Upload, FileSpreadsheet } from "lucide-react";

export default function TableComponent({
  columns = [],
  rows = [],
}: any) {
  const [tableColumns, setTableColumns] = useState(columns);
  const [tableRows, setTableRows] = useState(rows);
  const [fileName, setFileName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCSVUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (result: any) => {
        if (!result.data.length) return;

        const [header, ...body] = result.data;

        setTableColumns(header);
        setTableRows(body);
      },
      skipEmptyLines: true,
    });
  }

  return (
    <div className="space-y-5">
      {/* CSV Import */}
      <div className="flex flex-col gap-2">

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700 hover:shadow-lg"
        >
          <Upload size={18} />
          Import CSV
        </button>

        {fileName && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileSpreadsheet size={16} className="text-green-600" />
            <span>{fileName}</span>
          </div>
        )}

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {tableColumns.map((column: string) => (
                <th
                  key={column}
                  className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableRows.map((row: string[], index: number) => (
              <tr
                key={index}
                className="transition hover:bg-gray-50"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b px-4 py-3 text-sm text-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}