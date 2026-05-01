export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen px-2 py-4 bg-amber-500">
      {children}
    </div>
  );
}
