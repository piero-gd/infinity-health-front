import React, { useState } from "react";
import { sendExerciseProgress } from "../services/exerciseProgressService"; // Asegúrate de que la ruta sea correcta
import { showToast } from "../../../utils/toastConfig";

interface Props {
  exerciseId: number | string;
}

export default function ExerciseProgressForm({ exerciseId }: Props) {
  const [tab, setTab] = useState<"registro" | "comentarios">("registro");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Input sanitization functions
  const handleRepsChange = (value: string) => {
    // Allow only numbers
    const sanitized = value.replace(/[^\d]/g, '');
    setReps(sanitized);
  };

  const handleWeightChange = (value: string) => {
    // Allow numbers and one decimal point
    const sanitized = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
    setWeight(sanitized);
  };

  const handleCommentChange = (value: string) => {
    // Limit to 500 characters
    const sanitized = value.substring(0, 500);
    setComment(sanitized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendExerciseProgress({
        exerciseId,
        repetitions: reps,
        weight,
        comment,
        date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      });
      showToast.success("Registro Guardado");
      setReps("");
      setWeight("");
      setComment("");
    } catch (error) {
      showToast.error("Error al guardar el progreso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:px-6 px-0">
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border-2 border-[var(--color-primary)] p-4 sm:p-3 max-w-3xl mx-auto mb-4"
    >
      {/* Tabs */}
      <div
        className="flex items-center justify-center flex-wrap mb-4
            text-sm font-semibold 
            sm:px-3 sm:py-2 sm:text-sm
            md:px-4 md:py-2 md:text-base"
      >
        <button
          type="button"
          className={`
            px-2 py-1 transition
            ${tab === "registro"
              ? "border-b-2 border-[var(--color-primary)] text-black"
              : "text-gray-500"
            }
          `}
          onClick={() => setTab("registro")}
        >
          Registra tu progreso
        </button>
        <button
          type="button"
          className={`ml-2 sm:ml-4 px-2 py-1 transition ${tab === "comentarios"
            ? "border-b-2 border-[var(--color-primary)] text-black"
            : "text-gray-500"
            }`}
          onClick={() => setTab("comentarios")}
        >
          Comentarios
        </button>
      </div>

      {/* Formulario */}
      {tab === "registro" ? (
        <div className="flex xl:flex-col flex-col-2 sm:flex-row gap-2 sm:gap-4 mb-4 px-6">
          <div className="flex-1">
            <label className="block text-gray-600 text-sm sm:text-base mb-1">
              Repeticiones
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="12"
              value={reps}
              onChange={(e) => handleRepsChange(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 text-sm sm:text-base mb-1">
              Peso
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="2.5"
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 px-6">
          <label className="block text-gray-600 text-sm sm:text-base mb-1">
            Comentario
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-[var(--color-primary)]"
            placeholder="Agrega un comentario"
            value={comment}
            onChange={(e) => handleCommentChange(e.target.value)}
          />
          {comment.length > 450 && (
            <p className="text-xs text-gray-500 mt-1">
              {500 - comment.length} caracteres restantes
            </p>
          )}
        </div>
      )}

    </form>
      {/* Botón */}
      <button
        type="submit"
        className="w-2/5 mx-auto mt-9 py-2 sm:py-3 bg-gradient-to-t from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)]
        hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-bottom)] hover:to-[var(--color-btn-gradient-top)]
        rounded-full text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow"
    
        disabled={loading}
      >
        {loading ? "Guardando..." : "Registrar Progreso"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
    </div>
  );
}
