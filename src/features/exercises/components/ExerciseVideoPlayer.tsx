// src/features/routines/components/RoutineVideoPlayer.tsx
import type { FC } from 'react';

interface Props {
  videoUrl: string;
}

const RoutineVideoPlayer: FC<Props> = ({ videoUrl }) => (
  <div className="my-6 mx-32 max-w-full">
    <iframe
      src={videoUrl}
      width="100%"
      height="510px"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      className="rounded-md shadow"
      title="Rutina"
    />
  </div>
);

export default RoutineVideoPlayer;
