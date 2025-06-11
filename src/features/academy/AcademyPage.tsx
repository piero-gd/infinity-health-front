import ZoomSession from "./ZoomSession";

export default function AcademyPage() {
  return (
    <div className="academy-page flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Sesión en Vivo: Academia
      </h1>
      <ZoomSession />
    </div>
  );
}