export function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-center text-[32px] font-bold md:text-5xl">
      {children}
    </h2>
  );
}
