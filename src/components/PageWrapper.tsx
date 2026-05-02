export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 w-full px-2 py-4 bg-amber-600">
      {children}
    </div>
  );
}
