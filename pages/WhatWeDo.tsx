import React, { useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KeyMetrics } from '../components/KeyMetrics';
import { ImpactStoriesCarousel } from '../components/ImpactStoriesCarousel';

export const WhatWeDo: React.FC = () => {
  const nextSectionRef = useRef<HTMLElement>(null);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    {
      num: '01',
      title: 'Collecting & Weighing',
      desc: 'Our dedicated team conducts regular clean-up campaigns. After each clean, they meticulously collect and weigh the plastic waste retrieved to determine the scale of the issue.',
    },
    {
      num: '02',
      title: 'Sorting the Waste',
      desc: 'Collected waste is sorted to categorise different types of plastic materials. This sorting process is essential for efficient recycling and helps identify pollution trends.',
    },
    {
      num: '03',
      title: 'Brand Auditing',
      desc: 'We identify sources of plastic pollution by tracking brands on items. This allows us to engage companies to promote responsible packaging.',
    },
    {
      num: '04',
      title: 'Directing to Resellers',
      desc: 'We ensure plastic waste is allocated to correct recycling facilities to prevent landfill use, promoting the circular economy.',
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
              src="https://placehold.co/1920x1080/webp" 
              alt="What We Do Background" 
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center h-full flex flex-col justify-center items-center pt-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Our Process</h1>
            <p className="text-blue-100 text-xl md:text-2xl max-w-6xl mx-auto leading-relaxed font-light mb-12 opacity-90">
                To restore the natural purity of South Africa's rivers and wetlands through impactful clean-up initiatives, community engagement, and sustainable
                practices, we follow a systematic approach to environmental stewardship, ensuring every piece of litter is accounted for and responsibly managed.
            </p>

             {/* Scroll Button */}
             <div className="absolute bottom-8 w-full flex justify-center items-center">
                <button 
                    onClick={scrollToNextSection}
                    className="p-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm animate-bounce shadow-lg cursor-pointer group"
                    aria-label="Scroll Down"
                >
                    <ChevronDown size={32} className="group-hover:text-brand-yellow transition-colors" />
                </button>
             </div>
        </div>
      </section>

      {/* Process Steps - Dark Themed Redesign */}
      <section ref={nextSectionRef} className="py-24 bg-[#003366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Area */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-green"></div>
                    <span className="text-brand-green font-bold tracking-widest uppercase text-xs">4 Simple Steps</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
                    Transforming Waste<br/>
                    to Opportunity
                </h2>
                <div className="w-full h-px bg-white/10"></div>
            </div>

            {/* 4 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step) => (
                    <div key={step.num} className="bg-white/5 rounded-2xl p-8 flex flex-col min-h-[300px] hover:bg-white/10 transition-colors duration-300 border border-white/10 group backdrop-blur-sm">
                        {/* Fixed height header container ensures description starts at same position */}
                        <div className="min-h-[125px]">
                            <span className="block text-white/90 text-xl font-medium mb-3">{step.num}.</span>
                            <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-brand-green transition-colors">{step.title}</h3>
                        </div>
                        <div>
                             <p className="text-blue-100 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Bar */}
            <div className="mt-8 bg-white/5 rounded-2xl p-4 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-4 w-full md:w-auto">
                     <div className="flex -space-x-3 flex-shrink-0">
                        <img src="https://picsum.photos/seed/v1/100/100" className="w-10 h-10 rounded-full border-2 border-brand-blue object-cover" alt="Volunteer" />
                        <img src="https://picsum.photos/seed/v2/100/100" className="w-10 h-10 rounded-full border-2 border-brand-blue object-cover" alt="Volunteer" />
                        <img src="https://picsum.photos/seed/v3/100/100" className="w-10 h-10 rounded-full border-2 border-brand-blue object-cover" alt="Volunteer" />
                        <div className="w-10 h-10 rounded-full border-2 border-brand-blue bg-brand-green flex items-center justify-center text-xs text-white font-bold">+100</div>
                     </div>
                     <p className="text-white font-medium text-sm md:text-base">Align with a community that chooses <span className="text-white font-bold">Action</span></p>
                </div>
                
                <Link to="/get-involved" className="bg-white text-[#0B1120] px-8 py-3 rounded-full font-bold hover:bg-brand-green hover:text-white transition-all flex items-center justify-center gap-2 group w-full md:w-auto whitespace-nowrap">
                    Start Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

        </div>
      </section>

      {/* Key Metric Highlight */}
      <KeyMetrics />

      {/* Upcycling Feature - New Grid Layout */}
      <section className="bg-slate-100 pb-24">
         {/* Gray Header Area */}
         <div className=" py-24 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-4 block">Circular Economy</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Upcycling in Action</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                    We have started an upcycling workshop in the heart of Soweto, Orlando West. This initiative was made possible through a generous donation of workshop space.
                </p>
            </div>
         </div>

         {/* Image Grid */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { src: "https://placehold.co/800x600/webp", alt: "Workshop Space" },
                    { src: "https://placehold.co/800x600/webp", alt: "Plastic Sorting" },
                    { src: "https://placehold.co/800x600/webp", alt: "Upcycling Machinery" },
                    { src: "https://placehold.co/800x600/webp", alt: "Pen Production" },
                    { src: "https://placehold.co/800x600/webp", alt: "Finished Products" },
                    { src: "https://placehold.co/800x600/webp", alt: "Our Team" }
                ].map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg shadow-md group">
                        <img 
                            src={img.src} 
                            alt={img.alt} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Impact Stories Carousel */}
      <section className="py-24 overflow-hidden">
        <ImpactStoriesCarousel />
      </section>

      {/* Call to Action Section */}
      <section className="bg-brand-blue py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Be Part of the Solution</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Your support enables us to continue these critical cleaning and upcycling operations. Join us in making a tangible difference for our rivers and communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                    to="/get-involved" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-green text-white font-bold rounded-full hover:bg-green-600 transition shadow-lg transform hover:-translate-y-1"
                >
                    Volunteer Now
                </Link>
                <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-brand-blue transition"
                >
                    Partner With Us
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};