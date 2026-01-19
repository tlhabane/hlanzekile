import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { MediaAsset } from '../types';

interface LightboxProps {
    media: MediaAsset[];
    initialIndex: number;
    onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ media, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoaded, setIsLoaded] = useState(false);

    const goToPrevious = useCallback(() => {
        setIsLoaded(false);
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    }, [media.length]);

    const goToNext = useCallback(() => {
        setIsLoaded(false);
        setCurrentIndex((prev) => (prev + 1) % media.length);
    }, [media.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, goToPrevious, goToNext]);

    const currentMedia = media[currentIndex];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white z-[210]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                        <Maximize2 size={20} />
                    </div>
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest block opacity-60">Gallery View</span>
                        <span className="text-sm font-bold">{currentIndex + 1} / {media.length}</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Navigation */}
            <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[210] border border-white/10"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-[210] border border-white/10"
            >
                <ChevronRight size={32} />
            </button>

            {/* Media Display */}
            <div className="w-full h-full max-w-7xl max-h-[80vh] flex items-center justify-center p-4">
                {currentMedia.type === 'image' ? (
                    <img
                        src={currentMedia.url}
                        alt="Lightbox view"
                        className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                    />
                ) : (
                    <video
                        src={currentMedia.url}
                        controls
                        autoPlay
                        className="max-w-full max-h-full"
                        onLoadedData={() => setIsLoaded(true)}
                    />
                )}

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-[210] max-w-[90vw] overflow-x-auto p-2 scrollbar-hide">
                {media.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setIsLoaded(false);
                            setCurrentIndex(idx);
                        }}
                        className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${currentIndex === idx ? 'border-brand-green scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                        <img
                            src={item.thumbnail || item.url}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
