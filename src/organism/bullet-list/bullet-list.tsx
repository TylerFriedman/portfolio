export function BulletList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="max-w-160 list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
