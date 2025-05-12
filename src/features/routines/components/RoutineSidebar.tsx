import { ListBulletIcon, PlayCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { useRoutinesContext } from "../context/RoutinesContext";
import { useNavigate } from "react-router-dom";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function RoutineSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const navigate = useNavigate();

  const {
    routines,
    selectedRoutineIndex,
    selectedExerciseIndex,
    setSelectedRoutineIndex,
    setSelectedExerciseIndex,
  } = useRoutinesContext();

  return (
    <Fragment>
      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] p-4 transform transition-transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:inset-auto`}
      >
        {/* Cerrar en móvil */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text)]">Contenido</h2>
          <button onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú">
            <XMarkIcon className="h-6 w-6 text-[var(--color-text)]" />
          </button>
        </div>

        {/* Título general */}
        <h2 className="hidden md:flex text-lg font-bold mb-4 items-center gap-2 text-[var(--color-text)]">
          <ListBulletIcon className="h-6 w-6 text-[var(--color-primary-accent)]" />
          Contenido
        </h2>

        {/* Listado de routines */}
        {routines.map((routine, rIndex) => (
          <div key={rIndex} className="bg-[var(--color-surface)] rounded-lg shadow p-3 mb-4">
            {/* Header del grupo con botón de colapso */}
            <button
              onClick={() => {
                //aqui probar con variantes para corregir la seleccion
                navigate(`/routines/${rIndex}`);
                setSelectedRoutineIndex(rIndex);
                setSelectedExerciseIndex(0);
                sidebarOpen && setSidebarOpen(false);
              }}
              className={`flex justify-between items-center w-full text-left font-semibold mb-2 ${
                rIndex === selectedRoutineIndex
                  ? 'text-[var(--color-primary-accent)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              <span>{routine.titulo}</span>
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  rIndex === selectedRoutineIndex ? 'rotate-180' : 'rotate-0'
                } text-[var(--color-primary-accent)]`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Ejercicios (visible sólo si grupo seleccionado) */}
            <ul className={`${rIndex === selectedRoutineIndex ? 'block' : 'hidden'} ml-2 space-y-2`}>
              {routine.ejercicios.map((exercise, eIndex) => (
                <li key={eIndex}>
                  <button
                    onClick={() => {
                      setSelectedRoutineIndex(rIndex);
                      setSelectedExerciseIndex(eIndex);
                      navigate(`/routines/${rIndex}`);
                      sidebarOpen && setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      rIndex === selectedRoutineIndex && eIndex === selectedExerciseIndex
                        ? 'text-[var(--color-primary-light)]'
                        : 'text-[var(--color-text-muted)]'
                    } hover:text-[var(--color-primary-accent)]`}
                  >
                    <PlayCircleIcon className="h-4 w-4 text-[var(--color-primary-accent)]" />
                    {exercise.titulo}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </Fragment>
  );
}
