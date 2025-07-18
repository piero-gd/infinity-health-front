import type { FC } from 'react';

interface Props {
  videoUrl: string;
}

const ExerciseVideoPlayer: FC<Props> = ({ videoUrl }) => (
  <div className="w-full max-w-4xl mx-auto mb-6">
    {/* Responsive video container with 16:9 aspect ratio */}
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={videoUrl}
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Exercise Video"
      />
    </div>
  </div>
);

export default ExerciseVideoPlayer;
