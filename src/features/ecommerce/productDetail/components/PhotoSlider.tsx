import { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface PhotoSliderProps {
  images: string[];
  videos: string[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ images, videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');

  // Create media array with type information
  const media: MediaItem[] = [
    ...images.map(url => ({ type: 'image' as const, url })),
    ...videos.map(url => ({ type: 'video' as const, url }))
  ];

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.type === 'video';

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const openVideoModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideo('');
  };

  const renderThumbnail = (item: MediaItem, index: number) => {
    const isActive = currentIndex === index;
    const isVideoItem = item.type === 'video';

    return (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden transition-all ${
          isActive ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:opacity-80'
        }`}
      >
        {isVideoItem && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play size={20} className="text-white" fill="white" />
          </div>
        )}
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
          {isVideoItem ? 'Video' : 'Image'}
        </div>
      </button>
    );
  };

  return (
    <div className="p-4">
      {/* Main media display */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
        {currentMedia ? (
          <div className="w-full h-full flex items-center justify-center">
            {isVideo ? (
              <button
                onClick={() => openVideoModal(currentMedia.url)}
                className="w-full h-full flex items-center justify-center relative group"
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:opacity-100">
                  <Play size={64} className="text-white/90" fill="white" />
                </div>
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Video Preview</span>
                </div>
              </button>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image {currentIndex + 1}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No media available
          </div>
        )}

        {/* Navigation arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all"
              aria-label="Previous media"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all"
              aria-label="Next media"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {media.map((item, index) => (
            <div key={index} className="relative">
              {renderThumbnail(item, index)}
            </div>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeVideoModal}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeVideoModal();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <video
              src={currentVideo}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};