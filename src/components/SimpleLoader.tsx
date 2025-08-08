
interface LoaderProps {
  message?: string;
}

const SimpleLoader = ({ message }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 ">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
      {/* Mensaje */}
      {message && <p className="text-text animate-pulse text-lg">{message}</p>}
    </div>
  );
};

export default SimpleLoader;
