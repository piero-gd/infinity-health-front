import { useEffect, useState } from 'react';

interface Props {
  duration: number; // segundos
  onComplete: () => void;
}

export default function RestScreen({ duration, onComplete }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[var(--color-background)] text-[var(--color-text)] p-4">
      <img
        src="/img/rest.gif"
        alt="Descanso"
        className="w-32 h-32 mb-4"
      />
      <div className="text-3xl font-bold">
        Descanso: {secondsLeft}s
      </div>
    </div>
  );
}
