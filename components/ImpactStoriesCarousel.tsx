import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Video } from 'lucide-react';
import { MOCK_STORIES } from '@/services';

type Props = {
    areaName?: string;
    storyId?: string;
}

export const ImpactStoriesCarousel: React.FC<Props> = ({ areaName = '', storyId = '' }) => {
    // Carousel State
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentStoryPage, setCurrentStoryPage] = useState(0);
    const storyContainerRef = useRef<HTMLDivElement>(null);

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
        if (storyContainerRef.current) {
            const page = Math.round(storyContainerRef.current.scrollLeft / storyContainerRef.current.clientWidth);
            setCurrentStoryPage(page);
        }
    };

    const scrollToPage = (index: number) => {
        if (storyContainerRef.current) {
            storyContainerRef.current.scrollTo({
                left: index * storyContainerRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };

    let stories = MOCK_STORIES.filter((story) => story.id !== storyId);
    if (areaName.trim() !== '') {
        stories = stories.filter((story) => story.areas.map(
            (area) => area.trim().toLowerCase()).includes(areaName.trim().toLowerCase())
        );
    }

    const filteredStories = areaName.trim() !== '' || storyId.trim() !== '';
    if (!filteredStories) {
        stories = stories.slice(0, 5);
    }
    const totalStoryPages = Math.ceil(stories.length / itemsPerPage);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                        {storyId.trim() === '' ? 'Recent' : 'More'} Impact Stories
                    </h2>
                    <p className="text-slate-500">
                        Highlights from our{storyId.trim() === '' ? ' latest ' : ' other '}campaigns{areaName.trim() === '' ? '' : ` in ${areaName}`}
                    </p>
                </div>
                {/* Desktop Button */}
                {filteredStories ? (
                    <Link
                        to="/impact"
                        className="hidden md:inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
                    >
                        See Impact Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                ) : (
                    <Link
                        to="/impact-stories"
                        className="hidden md:inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
                    >
                        See All Stories <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                )}
            </div>

            {/* Swipeable Carousel Container with hidden scrollbar */}
            <div
                ref={storyContainerRef}
                onScroll={handleStoryScroll}
                className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 max-w-7xl md:mx-auto md:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
                {stories.map((story) => (
                    <div key={story.id} className="snap-start flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3">
                        <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group h-full">
                            <div className="aspect-[4/3]  overflow-hidden rounded-t-xl relative">
                                <Link to={`/impact/story/${story.slug}`}>
                                    <img
                                        src={story.mainMedia.thumbnail || story.mainMedia.url}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-blue shadow-sm">
                                        {story.date}
                                    </div>
                                    {story.mainMedia.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                            <div className="w-12 h-12 opacity-50 bg-brand-green/90 rounded-full flex items-center justify-center text-white">
                                                <Video size={20} className="ml-0.5" />
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <Link to={`/impact/story/${story.slug}`}>
                                    <h3
                                        className="font-bold text-xl text-slate-800 mb-3 line-clamp-1 group-hover:text-brand-green transition-colors"
                                    >
                                        {story.title}
                                    </h3>
                                </Link>
                                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                                    {story.excerpt}
                                </p>
                                <div className="mt-auto text-center">
                                    <Link
                                        to={`/impact/story/${story.slug}`}
                                        className="inline-block px-6 py-2 bg-slate-100 text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition-colors text-sm"
                                    >
                                        Read Story
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel Dots */}
            {totalStoryPages > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                    {Array.from({ length: totalStoryPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToPage(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentStoryPage ? 'bg-brand-blue w-8' : 'bg-slate-300 w-2 hover:bg-slate-400'}`}
                            aria-label={`Go to story page ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <div className="text-center md:hidden mt-8">
                {/* Mobile Button */}
                {filteredStories ? (
                    <Link
                        to="/impact"
                        className="inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
                    >
                        Impact Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                ) : (
                    <Link
                        to="/impact-stories"
                        className="inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
                    >
                        See All Stories <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                )}
            </div>
        </>
    );
};
