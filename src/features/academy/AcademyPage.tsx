import ZoomSession from "./ZoomSession";

export default function AcademyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Sesión en Vivo: Academia
      </h1>
      <ZoomSession />
    </div>
  );
}