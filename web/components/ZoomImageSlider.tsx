import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaAsset } from '@/types.ts';

type Props = {
    media: MediaAsset[]
};

export const ZoomImageSlider: React.FC<Props> = ({ media }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const getGalleryImages = (assets: MediaAsset[]) => {
        const images = assets.filter((img) => img.type === 'image');
        return images.map((img) => img.url);
    }

    const images = getGalleryImages(media);

    return (
        <div className="relative group max-w-3xl py-24 mx-auto">
            <div className="overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl relative">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                        alt={`Gallery image progress ${idx + 1}`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                <button
                    onClick={() =>
                        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-brand-blue w-6' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}