import React, { useState, useEffect } from 'react';

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ProcessAccordionProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  intro?: string;
}

export const ProcessAccordion: React.FC<ProcessAccordionProps> = ({ 
  steps,
  title = "Our Process",
  subtitle,
  intro = "We follow a systematic approach to environmental stewardship. That's how we transform waste, into opportunity."
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const DURATION = 10000; // 10 seconds per step

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, DURATION);

    return () => clearInterval(timer);
  }, [isPaused, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  // Shared Header Component
  const HeaderContent = ({ centered = false }: { centered?: boolean }) => (
    <div className={`mb-8 lg:mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl font-bold text-brand-blue mb-2">{title}</h2>
      {subtitle && <p className="text-sm font-bold text-brand-green uppercase tracking-wider mb-4">{subtitle}</p>}
      <div className={`w-20 h-1 bg-brand-green mb-6 ${centered ? 'mx-auto' : ''}`}></div>
      <p className={`text-lg text-slate-600 ${centered ? 'max-w-3xl mx-auto' : ''}`}>
        {intro}
      </p>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile/Tablet Portrait Header (Visible below lg) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 mb-8 pt-8">
        <HeaderContent centered={true} />
      </div>

      {/* Accordion Layout */}
      <div className="flex flex-col lg:flex-row w-full lg:min-h-[600px]">
        {/* Left Side - Images (Desktop Only) */}
        <div className="hidden lg:block lg:w-1/2 relative min-h-[600px] overflow-hidden bg-slate-900">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/20"></div>
            </div>
          ))}
        </div>

        {/* Right Side - Accordion Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white">
            <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:pl-16 lg:pr-8 py-8 lg:py-12">
                {/* Desktop Header (Visible lg and up) */}
                <div className="hidden lg:block">
                   <HeaderContent centered={false} />
                </div>

                <div className="space-y-4">
                {steps.map((step, index) => (
                    <div 
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`relative pl-8 pr-4 cursor-pointer group transition-all duration-300 ${activeIndex === index ? 'py-2' : 'py-3'}`}
                    >
                    {/* Vertical Border Background Track */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 rounded-full my-2" />
                    
                    {/* Active Progress Border */}
                    {activeIndex === index && (
                        <div 
                        className="absolute left-0 top-0 w-1 bg-brand-green rounded-full my-2"
                        style={{
                            height: isPaused ? 'calc(100% - 16px)' : '0%', // Adjust for margin
                            animation: !isPaused ? `fillHeight ${DURATION}ms linear forwards` : 'none'
                        }}
                        />
                    )}

                    <div className="flex flex-col">
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${
                        activeIndex === index ? 'text-brand-blue' : 'text-slate-400 group-hover:text-slate-600'
                        }`}>
                        {step.title}
                        </h3>
                        
                        <div 
                        className={`grid transition-all duration-500 ease-in-out ${
                            activeIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                        }`}
                        >
                        <div className="overflow-hidden">
                            {/* Mobile/Tablet Portrait Image (Inline) */}
                            <div className="lg:hidden mb-4 relative h-56 rounded-xl overflow-hidden w-full shadow-md">
                                <img 
                                    src={step.image} 
                                    alt={step.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-slate-600 leading-relaxed text-base">
                            {step.description}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                
                {/* Status Indicator */}
                {isPaused && (
                    <div className="mt-8 ml-8 text-xs text-brand-green font-semibold flex items-center animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-brand-green mr-2"></span>
                        Interactive Mode Active
                    </div>
                )}
            </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fillHeight {
          from { height: 0%; }
          to { height: calc(100% - 16px); }
        }
      `}</style>
    </div>
  );
};