// src/features/routines/components/RoutineVideoPlayer.tsx
import type { FC } from 'react';

interface Props {
  videoUrl: string; // p.ej. https://iframe.mediadelivery.net/play/426873/487b6c62-...
}

const RoutineVideoPlayer: FC<Props> = ({ videoUrl }) => (
  <div className="mb-6 max-w-full">
    <iframe
      src={videoUrl}
      width="100%"
      height="400px"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      className="rounded-md shadow"
      title="Rutina"
    />
  </div>
);

export default RoutineVideoPlayer;
