import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Droplets, MapPin, Zap } from 'lucide-react';
import { MOCK_AREAS } from '../services/mockData';

export const SponsorGridV1: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://placehold.co/1920x1080/webp?text=River+Sponsorship"
            alt="River Sponsorship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/50 text-sm font-semibold mb-8 backdrop-blur-sm">
            <Zap size={14} className="fill-current" /> Exclusive Stewardship
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Sponsor a <span className="text-brand-green italic">Grid</span>
          </h1>
          <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light opacity-90">
            Adopt a 5m x 5m segment of our vital riverbanks. Your sponsorship funds the cleaning, brand auditing, and ecological maintenance of your specific grid for a full year.
          </p>
        </div>
      </section>

      {/* Area Selection Cards */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-brand-blue mb-6 tracking-tight">Choose a Location</h2>
          <div className="w-20 h-1 bg-brand-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {MOCK_AREAS.map((area) => (
            <div key={area.id} className="group bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
              <div className="h-[400px] relative overflow-hidden">
                <iframe
                  width="100%" height="100%" frameBorder="0"
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${area.coordinates.lng}!3d${area.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v123456789`}
                  /*src={`https://www.google.com/maps/embed/v1/view?key=AI*******************************-dTk&center=${area.coordinates.lat},${area.coordinates.lng}&zoom=14&maptype=satellite`}*/
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                  title={`Map of ${area.fullName}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <MapPin className="text-brand-green" size={16} />
                    <span className="text-xs font-black text-brand-blue uppercase tracking-widest">{area.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-12 flex flex-col flex-grow">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-brand-blue mb-2">{area.fullName}</h3>
                  <p className="text-sm font-bold text-brand-green uppercase tracking-wider mb-4">{area.name} District</p>
                  <p className="text-slate-600 font-light leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <Link
                    to={`/sponsor-a-grid/${area.id}`}
                    className="w-full py-5 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl group/btn uppercase tracking-widest text-sm"
                  >
                    Select Location <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green mx-auto mb-8 border border-brand-green/30">
              <Zap size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4">Immediate Action</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Your funds go directly to the cleanup crews operating in your specific grid within 48 hours.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-yellow/20 rounded-2xl flex items-center justify-center text-brand-yellow mx-auto mb-8 border border-brand-yellow/30">
              <Droplets size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4">Monthly Reporting</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Receive a detailed audit of the waste collected from your grid, including brand statistics.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-8 border border-blue-500/30">
              <MapPin size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4">Digital Twin</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Access your grid's "Digital Twin" in the member portal to see photos and cleanup logs anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
