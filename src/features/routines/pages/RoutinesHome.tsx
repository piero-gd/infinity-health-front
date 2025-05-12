import { useNavigate } from 'react-router-dom';
import { useRoutinesContext } from '../context/RoutinesContext';


export default function RoutinesHome() {
  const { routines } = useRoutinesContext();

  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    navigate(`/routines/${index}`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">¿Qué trabajaremos hoy?</h1>
      <div className="mx-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:mx-auto max-w-7xl">
        {routines.map((routine, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform"
          >
            <img
              src={routine.fotos || '/img/placeholder-muscle.jpg'}
              alt={routine.titulo}
              className="object-cover w-full h-56 group-hover:brightness-75 transition"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-white text-xl font-semibold text-center px-2">
                {routine.titulo}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
