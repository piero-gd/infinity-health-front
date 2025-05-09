import { useRef, useEffect } from 'react';

interface Props {
  videoUrl: string;
  onEnded: () => void;
}

export default function RoutineVideoPlayer({ videoUrl, onEnded }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('ended', onEnded);
    };
  }, [onEnded]);

  return (
    <div className="mb-6 max-w-full mx-auto">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full h-auto rounded-md shadow"
      />
    </div>
  );
}
