
interface LoaderProps {
  message?: string;
}

const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-surface)]">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--color-primary)] mb-4"></div>
      {/* Mensaje */}
      {message && <p className="text-[var(--color-text)] text-lg">{message}</p>}
    </div>
  );
};

export default Loader;
