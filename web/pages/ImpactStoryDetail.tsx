
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Tag,
    Calendar,
    Play,
    ImageIcon,
    VideoIcon,
    Maximize2,
    ChevronLeft,
    ChevronRight,
    Heart
} from 'lucide-react';
import { MOCK_STORIES } from '@/services';
import { Lightbox } from '../components/Lightbox';
import { ImpactStoriesCarousel } from '../components/ImpactStoriesCarousel';

export const ImpactStoryDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const story = MOCK_STORIES.find(s => s.slug === slug);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);

    if (!story) {
        window.document.title = 'Story not found :: Hlanzekile River & Ocean Cleaning';
        return (
            <div className="pt-40 text-center pb-20">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Story not found</h2>
                <Link to="/impact" className="text-brand-blue font-bold hover:underline">Back to Impact Dashboard</Link>
            </div>
        );
    }

    window.document.title = `${story.title} :: Hlanzekile River & Ocean Cleaning`;

    const allMedia = [story.mainMedia, ...story.gallery];

    const nextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMediaIndex((prev) => (prev + 1) % allMedia.length);
    };

    const prevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    const headerImage = story.mainMedia.type === 'video' ? (story.mainMedia?.thumbnail || '') : story.mainMedia.url;

    return (
        <div className="animate-fade-in bg-white min-h-screen">
            {/* Header with Blue Background */}
            <section className="bg-brand-blue pt-32 pb-48 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {headerImage.trim() !== '' && (
                        <img
                            src={headerImage}
                            alt={story.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-green/70 mix-blend-multiply" />
                </div>
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Tag size={400} />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <Link
                        to="/impact"
                        className="inline-flex items-center text-blue-200 hover:text-white mb-10 transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Impact
                    </Link>

                    <div className="text-left">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                            {story.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 text-blue-200 text-xs font-black uppercase tracking-widest">
                                <Calendar size={14} /> {story.date}
                            </div>
                            {story.tags && story.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/50 text-[10px] font-black uppercase tracking-widest rounded-md border border-brand-green/30">
                                  {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Media Carousel Card */}
            <section className="relative z-20 px-6 -mt-32">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden group">
                        <div className="rounded-[2rem] overflow-hidden aspect-[16/9] relative bg-slate-100">
                            {/* Media Items */}
                            {allMedia.map((media, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                        activeMediaIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                                >
                                    {media.type === 'video' ? (
                                        <div className="w-full h-full relative">
                                            <video
                                                src={media.url}
                                                poster={media.thumbnail}
                                                className="w-full h-full object-cover"
                                                controls={activeMediaIndex === idx}
                                            />
                                            {(!media.thumbnail && activeMediaIndex !== idx) && (
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <div
                                                        className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center text-white shadow-xl">
                                                    <Play size={40} className="ml-1" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full h-full cursor-zoom-in relative"
                                            onClick={() => setLightboxIndex(idx)}
                                        >
                                            <img
                                                src={media.url}
                                                alt={`${story.title} - Media ${idx + 1}`}
                                                className="w-full object-fit"
                                            />
                                            <div className="absolute inset-0 bg-brand-blue/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="p-4 bg-white/90 rounded-full shadow-2xl">
                                                    <Maximize2 className="text-brand-blue" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Navigation Arrows (visible on card hover) */}
                            {allMedia.length > 1 && (
                                <div className="absolute inset-0 z-20 flex items-center justify-between px-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={prevMedia}
                                        className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all shadow-xl pointer-events-auto"
                                        aria-label="Previous media"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        onClick={nextMedia}
                                        className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all shadow-xl pointer-events-auto"
                                        aria-label="Next media"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </div>
                            )}

                            {/* Navigation Dots */}
                            {allMedia.length > 1 && (
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                                    {allMedia.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveMediaIndex(idx)}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                activeMediaIndex === idx ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                                            }`}
                                            aria-label={`Go to media ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <div className="space-y-8 text-slate-600 font-light leading-relaxed">
                            {story.content.map((paragraph, idx) => (
                                <p key={idx} className="whitespace-pre-line">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>
                </div>
            </section>

            {/* Media Gallery Section */}
            {allMedia.length > 1 && (
                <section className="py-20 bg-slate-50 px-6 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center gap-3 mb-12">
                            <div className="w-10 h-1 bg-brand-green rounded-full"></div>
                            <h2 className="text-2xl font-black text-brand-blue tracking-tight text-center">Media Gallery</h2>
                            <div className="w-10 h-1 bg-brand-green rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allMedia.map((media, idx) => {
                                // Add 1 because index 0 is always the mainMedia
                                const actualIndex = idx + 1;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setLightboxIndex(actualIndex)}
                                        className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl group relative cursor-pointer"
                                    >
                                        <div className="rounded-2xl aspect-[4/3] overflow-hidden relative bg-slate-100">
                                            {media.type === 'video' ? (
                                                <div className="w-full h-full relative">
                                                    <img src={media.thumbnail || "https://placehold.co/800x450/003366/white?text=Video+Content"} alt="Video Preview" className="w-full h-full object-cover" />
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
                                                        src={media.url}
                                                        alt={`Gallery ${idx}`}
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
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Lightbox Component Integration */}
            {lightboxIndex !== null && (
                <Lightbox
                    media={[story.mainMedia, ...story.gallery]}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}

            {/* CTA Section */}
            <section className={`py-32 ${allMedia.length <= 1 ? 'bg-slate-50' : 'bg-white'} text-center border-t border-slate-100`}>
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-brand-blue tracking-tighter mb-6">Inspired by this story?</h2>
                    <p className="text-slate-500 mb-10 leading-relaxed font-light">
                        Every story of impact is made possible by stewards like you. Join us in cleaning and restoring our rivers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="https://pay.yoco.com/hlanzekile-river-and-ocean-cleaning-npc" target="_blank" className="px-12 py-5 bg-brand-green text-white font-black rounded-full hover:bg-green-600 transition shadow-2xl flex items-center justify-center gap-2 group tracking-widest uppercase text-sm">
                            Donate <Heart className="w-5 h-5 group-hover:fill-current" />
                        </Link>
                        <Link to="/impact" className="px-12 py-5 bg-blue-50 text-brand-blue font-black rounded-full hover:bg-blue-100 transition shadow-md flex items-center justify-center gap-2 group tracking-widest uppercase text-sm">
                            See More Impact
                        </Link>
                    </div>
                </div>
            </section>

            {/* Impact Stories Carousel */}
            <section className={`py-24 ${allMedia.length <= 1 ? 'bg-white' : 'bg-slate-50'} overflow-hidden`}>
                <ImpactStoriesCarousel storyId={story.id} />
            </section>
        </div>
    );
};
