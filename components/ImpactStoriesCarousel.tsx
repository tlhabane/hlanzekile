
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MOCK_CLEANUPS } from '../services/mockData';

export const ImpactStoriesCarousel: React.FC = () => {
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

  const totalStoryPages = Math.ceil(MOCK_CLEANUPS.length / itemsPerPage);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Recent Impact Stories</h2>
                <p className="text-slate-500">Highlights from our latest campaigns</p>
            </div>
            {/* Desktop Button */}
            <Link 
                to="/impact" 
                className="hidden md:inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
            >
                Read More Stories <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        {/* Swipeable Carousel Container with hidden scrollbar */}
        <div 
            ref={storyContainerRef}
            onScroll={handleStoryScroll}
            className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 max-w-7xl md:mx-auto md:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
            {MOCK_CLEANUPS.map((story, index) => (
                <div key={story.id} className="snap-start flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group cursor-pointer h-full">
                        <div className="h-48 overflow-hidden rounded-t-xl relative">
                            <img 
                                src={story.imageUrl || 'https://placehold.co/1080x1080/webp'} 
                                alt={story.location} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-blue shadow-sm">
                                {story.date}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-1 group-hover:text-brand-green transition-colors">{story.location}</h3>
                            <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                                {/* Fixed: 'volunteers' changed to 'volunteersCount' */}
                                A successful cleanup event where {story.volunteersCount || 0} dedicated volunteers helped remove over {story.wasteCollected || 0}kgs of waste from the river ecosystem. 
                            </p>
                            <div className="mt-auto text-center">
                                <Link 
                                    to={`/impact`} 
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
             <Link 
                to="/impact" 
                className="inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
            >
                Read More Stories <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
    </>
  );
};
