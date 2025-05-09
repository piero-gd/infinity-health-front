import { ListBulletIcon, PlayCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import type { Routine } from "../types";
import { Fragment } from "react/jsx-runtime";

interface Props {
  routines: Routine[];
  selectedRoutineIndex: number;
  selectedExerciseIndex: number;
  setSelectedRoutineIndex: (i: number) => void;
  setSelectedExerciseIndex: (i: number) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function RoutineSidebar({
  routines,
  selectedRoutineIndex,
  selectedExerciseIndex,
  setSelectedRoutineIndex,
  setSelectedExerciseIndex,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
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
            <button
              onClick={() => { setSelectedRoutineIndex(rIndex); setSelectedExerciseIndex(0); sidebarOpen && setSidebarOpen(false) }}
              className={`block w-full text-left font-semibold mb-2 ${
                rIndex === selectedRoutineIndex
                  ? 'text-[var(--color-primary-accent)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              {routine.titulo}
            </button>

            <ul className="ml-2 space-y-2">
              {routine.ejercicios.map((exercise, eIndex) => (
                <li key={eIndex}>
                  <button
                    onClick={() => { setSelectedRoutineIndex(rIndex); setSelectedExerciseIndex(eIndex); sidebarOpen && setSidebarOpen(false) }}
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
