export default function TableComponent({
  columns,
  rows,
}: any) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          {columns?.map((column: string) => (
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
        {rows?.map((row: string[], index: number) => (
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
  );
}