import React, { useState, useEffect, useRef } from 'react';
import { ImageIcon, Maximize2, Play, VideoIcon} from 'lucide-react';
import { Lightbox } from './Lightbox';
import { MediaAsset } from '@/types';

type Props = {
    media: MediaAsset[]
};

export const ImageCarousel: React.FC<Props> = ({ media }) => {
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentGalleryPage, setCurrentGalleryPage] = useState(0);
    const carouselContainerRef = useRef<HTMLDivElement>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Carousel Resize Effect
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setItemsPerPage(3);
            else if (window.innerWidth >= 768) setItemsPerPage(2);
            else setItemsPerPage(1);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleStoryScroll = () => {
        if (carouselContainerRef.current) {
            const page = Math.round(carouselContainerRef.current.scrollLeft / carouselContainerRef.current.clientWidth);
            setCurrentGalleryPage(page);
        }
    };

    const scrollToPage = (index: number) => {
        if (carouselContainerRef.current) {
            carouselContainerRef.current.scrollTo({
                left: index * carouselContainerRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };

    const totalGalleryPages = Math.ceil(media.length / itemsPerPage);
    return (
        <>
            <div
                ref={carouselContainerRef}
                onScroll={handleStoryScroll}
                className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 max-w-7xl md:mx-auto md:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
                {media.map((item, index) => {
                    return (
                        <div key={`${item.type}-${index}`} className="snap-start flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3">
                            <div
                                onClick={() => setLightboxIndex(index)}
                                className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl group relative cursor-pointer"
                            >
                                <div className="rounded-2xl aspect-[4/3] overflow-hidden relative bg-slate-100">
                                    {item.type === 'video' ? (
                                        <div className="w-full h-full relative">
                                            <img src={item.thumbnail || "https://placehold.co/800x450/003366/white?text=Video+Content"} alt="Video Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                                <Play size={48} className="text-white fill-current" />
                                            </div>
                                            <div className="absolute top-4 right-4 bg-brand-blue/80 p-2 rounded-lg text-white">
                                                <VideoIcon size={16} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full relative overflow-hidden">
                                            <img
                                                src={item.url}
                                                alt={`Gallery ${index}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 right-4 bg-brand-green/80 p-2 rounded-lg text-white">
                                                <ImageIcon size={16} />
                                            </div>
                                            <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Maximize2 className="text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Carousel Dots */}
            {totalGalleryPages > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                    {Array.from({ length: totalGalleryPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToPage(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentGalleryPage ? 'bg-brand-blue w-8' : 'bg-slate-300 w-2 hover:bg-slate-400'}`}
                            aria-label={`Go to story page ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Lightbox Component Integration */}
            {lightboxIndex !== null && (
                <Lightbox
                    media={media}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    )
}