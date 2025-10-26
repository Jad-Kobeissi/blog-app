export default function Error({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  return <h1 className={`text-red-500 text-[1.2rem] ${className}`}>{error}</h1>;
}
