export default function RoutineVideoPlayer({ videoUrl }: { videoUrl: string }) {
    const embedUrl = videoUrl.includes('youtube.com/watch?v=')
      ? videoUrl.replace('watch?v=', 'embed/')
      : videoUrl;
  
    return (
      <div className="mb-6 max-w-7xl mx-auto">
        <iframe
          className="w-full h-[400px] rounded-md shadow"
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Rutina"
        />
      </div>
    );
  }