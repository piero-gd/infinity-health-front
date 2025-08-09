import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExercises } from '../hooks/useExercises';
import ExerciseCard from '../components/ExerciseCard';
import Loader from '../../../components/Loader';
import type { TabOption } from '../../../components/Tabs';
import Tabs from '../../../components/Tabs';
import { GiLeg, GiSixEyes, GiStrong } from 'react-icons/gi';
import { IoBody } from 'react-icons/io5';

const tabOptions: TabOption[] = [
  { label: "Tren superior", value: "tren superior", icon: <GiStrong className="w-5 h-5" /> },
  { label: "Tren inferior", value: "tren inferior", icon: <GiLeg className="w-5 h-5" /> },
  { label: "Abdomen", value: "abdomen", icon: <GiSixEyes className="w-5 h-5" /> },
  { label: "Todo", value: "todo", icon: <IoBody className="w-5 h-5" /> },
];

export default function ExercisesHome() {
  const { exercises, loading, error } = useExercises();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("tren superior");

  const handleSelect = (index: number) => {
    navigate(`/exercises/${index}`);
  };

  // Filtra los ejercicios según la categoría seleccionada
  const filteredExercises =
    selected === "todo"
      ? exercises
      : exercises.filter((exercise) =>
          String(exercise.category).toLowerCase().includes(selected.toLowerCase())
        );

  if (loading) return <Loader message="Cargando ejercicios..." />;
  if (error) throw new Error(error);


  return (
    <div className="min-h-screen px-8 py-10">
      <h1 className="xl:text-3xl text-xl font-black xl:mb-10 mb-6 mt-1 xl:mt-0 text-center">¿Qué vas a entrenar hoy?</h1>
      <Tabs options={tabOptions} selectedValue={selected} onChange={setSelected} />
      {!filteredExercises || filteredExercises.length === 0 ? (
        <div className="text-center text-gray-500">No hay ejercicios disponibles.</div>
      ) : (
        <div className="px-2 sm:px-4 md:px-5 grid xl:gap-8 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:mx-8">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => handleSelect(exercise.id)}
        />
      ))}
    </div>
  )}
    </div>
  );
}
