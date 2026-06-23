export default function CardComponent({
  title,
  value,
}: any) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}