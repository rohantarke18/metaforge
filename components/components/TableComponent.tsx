"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function TableComponent({
  columns = [],
  rows = [],
}: any) {
  const [tableColumns, setTableColumns] = useState(columns);
  const [tableRows, setTableRows] = useState(rows);

  function handleCSVUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

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
    <div className="space-y-4">

      <div>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="block"
        />
      </div>

      <table className="w-full border-collapse border">

        <thead>
          <tr>
            {tableColumns.map((column: string) => (
              <th
                key={column}
                className="border bg-gray-100 p-2 text-left"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableRows.map((row: string[], index: number) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border p-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}