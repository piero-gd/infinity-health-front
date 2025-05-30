import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onSubmit: (data: { reps: string; weight: string; comment: string }) => void;
}

export default function ExerciseProgressForm({ onSubmit }: Props) {
  const [tab, setTab] = useState<"registro" | "comentarios">("registro");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reps, weight, comment });
    // Opcional: limpiar campos
    setReps("");
    setWeight("");
    setComment("");
    toast.success("Registro Guardado");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl mx-auto mb-4"
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          type="button"
          className={`px-4 py-2 font-semibold transition ${
            tab === "registro"
              ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
              : "text-gray-500"
          }`}
          onClick={() => setTab("registro")}
        >
          Registra tu entrenamiento
        </button>
        <button
          type="button"
          className={`ml-4 px-4 py-2 font-semibold transition ${
            tab === "comentarios"
              ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
              : "text-gray-500"
          }`}
          onClick={() => setTab("comentarios")}
        >
          Comentarios
        </button>
      </div>

      {/* Formulario */}
      {tab === "registro" ? (
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Repeticiones</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="12 repeticiones"
              value={reps}
              onChange={e => setReps(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Peso</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="2 kg"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Comentario</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-[var(--color-primary)]"
            placeholder="Agrega un comentario"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        className="w-full mt-2 py-2 rounded-full text-white font-semibold flex items-center justify-center gap-2 shadow"
        style={{ background: "var(--gradient-primary)" }}
      >
        Registrar Progreso
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    </form>
  );
}