
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Heart, ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { MOCK_AREAS } from '../services/mockData';
import { CountdownTimer } from '../components/CountdownTimer';

const CustomBar = (props: any) => {
  const { x, y, width, height, isStriped } = props;
  if (isStriped) {
    return (
      <g>
        <defs>
          <pattern id="areaStripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: '#003366', strokeWidth: 6, opacity: 0.2 }} />
          </pattern>
        </defs>
        <rect x={x} y={y} width={width} height={height} fill="#ffffff" ry={width / 12} />
        <rect x={x} y={y} width={width} height={height} fill="url(#areaStripes)" ry={width / 12} />
      </g>
    );
  }
  return <rect x={x} y={y} width={width} height={height} fill="#003366" ry={width / 12} />;
};

export const ImpactAreaDetail: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const area = MOCK_AREAS.find(a => a.id === areaId);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!area) return <div className="pt-32 text-center text-slate-500 font-bold">Area not found</div>;

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      {/* Map Hero - Full Viewport */}
      <section className="relative h-screen w-full z-0 overflow-hidden">
        <iframe 
          width="100%" height="100%" frameBorder="0" 
          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${area.coordinates.lng}!3d${area.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v123456789`}
          className="filter grayscale-[30%] opacity-80"
          title={`Map of ${area.fullName}`}
        />
        {/* Navigation Contrast Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        
        {/* Visual Cue for scroll */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-brand-blue text-[10px] font-black uppercase tracking-[0.4em] mb-2">Scroll for Impact</span>
            <div className="w-1 h-8 bg-brand-green/50 rounded-full" />
        </div>

        {/* Map Pin Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-pulse">
                <MapPin className="text-brand-green fill-brand-green/20" />
                <span className="font-black text-brand-blue uppercase tracking-widest text-base">{area.fullName}</span>
            </div>
        </div>
      </section>

      {/* Overlapping Dashboard */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10 space-y-12">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-slate-50">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Harmful Waste Collected (kgs)</h2>
            <p className="text-xs font-bold text-brand-blue uppercase tracking-widest opacity-60">{area.name}</p>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={area.impact.categories} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid vertical={false} strokeDasharray="5 5" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="category" axisLine={false} tickLine={false} dy={15}
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="kgs" shape={<CustomBar />} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Cleanups', value: `${area.impact.totalCleanups}`, sub: 'Weekends', dark: true },
            { label: 'Period', value: `${area.impact.periodMonths}`, sub: 'Months' },
            { label: 'Total Waste', value: `${(area.impact.totalWasteKgs / 1000).toFixed(1)}k+`, sub: 'Kilograms', dark: true },
            { label: 'People', value: `${area.impact.stewards}+`, sub: 'Stewards' }
          ].map((m, i) => (
            <div key={i} className={`rounded-2xl p-8 shadow-xl border border-slate-50 ${m.dark ? 'bg-brand-blue text-white' : 'bg-white'}`}>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-4 ${m.dark ? 'text-blue-200' : 'text-slate-400'}`}>
                {m.label}
              </span>
              <div className="text-6xl font-black mb-1 tracking-tighter">{m.value}</div>
              <span className={`text-sm font-bold opacity-80 ${m.dark ? 'text-white' : 'text-slate-800'}`}>{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Work in Progress */}
        <section className="py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Work in Progress</h2>
            <div className="w-16 h-1 bg-brand-green mx-auto mb-8"></div>
          </div>

          <div className="relative group max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl aspect-[16/7] shadow-2xl relative">
              {area.gallery.map((img, idx) => (
                <img 
                  key={idx} src={img} 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                  alt={`${area.name} progress ${idx + 1}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + area.gallery.length) % area.gallery.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % area.gallery.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
              >
                <ChevronRight />
              </button>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {area.gallery.map((_, idx) => (
                <button 
                  key={idx} onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-brand-blue w-6' : 'bg-slate-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Refined Content Sections from Company Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 max-w-5xl mx-auto">
            {area.contentSections.map((section, idx) => (
              <p key={idx} className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
                {section}
              </p>
            ))}
          </div>
        </section>

        {/* Next Cleanup Section */}
        <section className="pb-32 text-center">
          <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Our Next Cleanup</h2>
          <div className="w-16 h-1 bg-brand-green mx-auto mb-12"></div>
          <p className="text-slate-500 max-w-xl mx-auto mb-20 text-sm">Your contribution helps us transform more waste into economic opportunities.</p>
          
          <CountdownTimer />

          <div className="mt-24 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-12 py-5 bg-brand-green text-white font-black rounded-full hover:bg-green-600 transition shadow-2xl flex items-center justify-center gap-2 group tracking-widest uppercase text-sm">
              Donate <Heart className="w-5 h-5 group-hover:fill-current" />
            </button>
            <button className="px-12 py-5 bg-blue-50 text-brand-blue font-black rounded-full hover:bg-blue-100 transition shadow-md flex items-center justify-center gap-2 group tracking-widest uppercase text-sm">
              Volunteer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
