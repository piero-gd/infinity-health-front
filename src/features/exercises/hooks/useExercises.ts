import { useEffect, useState } from "react";
import { fetchExercises } from "../services/exercisesApi";
import type { Exercise } from "../types/exercise";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExercises()
      .then(data => {
        console.log("[useExercises] data received:", data);
        setExercises(data);
      })
      .catch(err => {
        setError(err.message);
        console.log("[useExercises] error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { exercises, loading, error };
}