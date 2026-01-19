
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Recycle } from 'lucide-react';

interface VisionCardProps {
    title: string;
    description: string;
    images: string[];
    icon: 'trash' | 'recycle';
    color: string;
}

export const VisionCard: React.FC<VisionCardProps> = ({ title, description, images, icon, color }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col h-full border border-slate-100 group">
            {/* Top: Image Carousel */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${title} carousel ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                            currentImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    />
                ))}

                {/* Navigation Arrows (Visible on hover) */}
                <div className="absolute inset-0 z-20 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={prevImage}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom: Content */}
            <div className="p-8 md:p-10 flex flex-col flex-grow items-start">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: color }}
                >
                    {icon === 'trash' ? <Trash2 size={32} /> : <Recycle size={32} />}
                </div>

                <h3 className="text-3xl font-black tracking-tighter mb-4" style={{ color: color }}>
                    {title}
                </h3>

                <p className="text-slate-600 leading-relaxed font-light text-base md:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};
