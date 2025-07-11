
interface LoaderProps {
  message?: string;
}

const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 ">
      {/* Spinner */}
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--color-primary)] mb-4"></div> */}
      <img
        className="mx-auto mb-4"
        src="/gif/dumbbells-moving.gif"
        alt="Loader"
        style={{ maxWidth: '100px' }}
      />
      {/* Mensaje */}
      {message && <p className="text-[var(--color-text)] animate-pulse text-lg">{message}</p>}
    </div>
  );
};

export default Loader;
