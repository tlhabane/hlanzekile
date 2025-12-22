
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, ChevronDown, Droplets, Recycle, Users, Waves, Heart, ShieldCheck, Zap } from 'lucide-react';

interface GridBlockProps {
  type: 'image' | 'text';
  title?: string;
  description?: string;
  buttonText?: string;
  price?: string;
  imageUrl?: string;
  link?: string;
  dark?: boolean;
}

const GridBlock: React.FC<GridBlockProps> = ({ 
  type, title, description, buttonText, price, imageUrl, link = "/portal", dark 
}) => {
  if (type === 'image') {
    return (
      <div className="aspect-square w-full overflow-hidden relative group">
              <img
                  src={imageUrl}
                  alt="Action visualization"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
          </div>
    );
  }

  return (
    <div className={`aspect-square w-full flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 ${dark ? 'bg-[#121212] text-white' : 'bg-brand-blue text-white'}`}>
      <h3 className="text-2xl font-black mb-4 tracking-tighter leading-none">
        {title}
      </h3>
      <p className="text-slate-300 text-sm md:text-base mb-8 max-w-[280px] leading-relaxed font-light">
        {description}
      </p>
      
      <Link 
        to={link}
        className="inline-flex items-center px-8 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-green-600 transition shadow-xl group/btn"
      >
        {buttonText} <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
      
      {price && (
        <p className="text-slate-300 text-xs mt-4 tracking-widest opacity-80">
          Starting from {price}
        </p>
      )}
    </div>
  );
};

export const GetInvolved: React.FC = () => {
  const contentRef = useRef<HTMLElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section - Viewport Fill */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
            <img 
              src="https://placehold.co/1920x1080" 
              alt="Environmental Restoration" 
              className="w-full h-full object-cover"
            />
            {/* Overlay for Contrast */}
            <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/20 to-brand-blue/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex align-center gap-2 py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/50 text-sm font-semibold mb-8 backdrop-blur-sm animate-fade-in">
                <Zap size={14} className="fill-current" /> Join our Movement
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Become a <br />
                <span className="text-brand-green italic underline decoration-brand-yellow/30">Steward </span>
                of Change
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12 opacity-90">
                Your hands, your voice, and your support are the primary drivers in restoring South Africa's vital water ecosystems.
            </p>
        </div>

        {/* Bouncing Scroll Button */}
        <div className="absolute bottom-10 w-full flex flex-col items-center gap-2 z-20">
            <span className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">See the Impact</span>
            <button 
                onClick={scrollToContent}
                className="p-5 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-md animate-bounce shadow-2xl cursor-pointer group"
                aria-label="Scroll Down"
            >
                <ChevronDown size={32} className="group-hover:text-brand-yellow transition-colors" />
            </button>
        </div>
      </section>
      
      {/* Impact Graphics Section - The "Entry" to getting involved */}
      <section ref={contentRef} className="bg-slate-50 pt-32 pb-24 px-4 scroll-mt-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tighter leading-none">
                        Evidence of <br/>
                        <span className="text-brand-green">Progress</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl font-light">
                        Since 2023, we have proved that localized action creates regional restoration. Our data-driven approach ensures that every Rand and every hour spent on the riverbank is accounted for. <span className="font-bold text-brand-blue">But we need more hands.</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-green-50 text-brand-green rounded-full flex items-center justify-center shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">Verified Restoration</p>
                                <p className="text-xs text-slate-500">Audited monthly progress</p>
                            </div>
                        </div>
                        <Link to="/impact-dashboard" className="inline-flex items-center gap-3 py-4 px-8 bg-brand-blue text-white font-bold rounded-2xl hover:bg-slate-900 transition shadow-lg group">
                            <BarChart2 size={20} className="group-hover:rotate-12 transition-transform" /> 
                            View Live Dashboard
                        </Link>
                    </div>
                </div>

                {/* Info Graphics Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-brand-blue/30 transition-colors">
                        <Waves size={32} className="text-brand-blue mb-6 group-hover:scale-110 transition-transform" />
                        <span className="text-5xl font-black text-slate-900 mb-1 tracking-tighter">11K+</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kgs Removed</span>
                    </div>
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-brand-green/30 transition-colors">
                        <Users size={32} className="text-brand-green mb-6 group-hover:scale-110 transition-transform" />
                        <span className="text-5xl font-black text-slate-900 mb-1 tracking-tighter">150+</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Stewards</span>
                    </div>
                    <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-brand-yellow/30 transition-colors">
                        <Recycle size={32} className="text-brand-yellow mb-6 group-hover:scale-110 transition-transform" />
                        <span className="text-5xl font-black text-slate-900 mb-1 tracking-tighter">600+</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Upcycled</span>
                    </div>
                    <div className="bg-brand-blue p-10 rounded-3xl border border-brand-blue shadow-2xl flex flex-col items-center text-center text-white group hover:bg-slate-900 transition-colors">
                        <Droplets size={32} className="text-brand-yellow mb-6 group-hover:animate-pulse" />
                        <span className="text-5xl font-black mb-1 tracking-tighter">48+</span>
                        <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em]">Live Events</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Choose Your Way Header */}
      <section className="bg-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tighter leading-none">Choose your <span className="text-brand-green">Path</span> <br/> to <span className="text-brand-green">Action</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-4">Every contribution is directly applied to our active field operations. Select a stewardship path that fits your commitment level.</p>
            <div className="w-20 h-1 bg-brand-yellow mx-auto"></div>
        </div>
      </section>

      {/* The Involvement Grid (Checkerboard Style) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-slate-100">
        
        {/* Row 1 */}
        <GridBlock 
            type="image" 
            imageUrl="https://placehold.co/1024x1024/webp" 
        />
        <GridBlock 
            type="text" 
            title="Sponsor a Grid"
            description="'Your own' square... fund the cleaning and maintenance of a 5m x 5m river bank segment for a full year."
            buttonText="Adopt a Grid"
            price="R500.00"
            link="/sponsor-a-grid"
            dark={true}
        />
        <GridBlock 
            type="image" 
            imageUrl="https://placehold.co/1024x1024/webp" 
        />
        <GridBlock 
            type="text" 
            title="Give Regularly"
            description="Provide essential, long-term support for our full-time cleaning crews and local youth employment programs."
            buttonText="Subscribe"
            price="R100.00 / mo"
            link="/checkout?type=regular"
            dark={false}
        />

        {/* Row 2 */}
        <GridBlock 
            type="text" 
            title="Become a Partner"
            description="Our Corporate Partnership packages include 100sqm grid sponsorship, brand auditing, and full ESG reporting."
            buttonText="Inquire"
            price="R5000.00 / mo"
            dark={false}
        />
        <GridBlock 
            type="image" 
            imageUrl="https://placehold.co/1024x1024/webp" 
        />
        <GridBlock 
            type="text" 
            title="Give Once"
            description="Restoration means hope for nature - fund an emergency cleanup or provide new equipment for our teams."
            buttonText="Donate from R50"
            price="R50.00"
            link="/checkout?type=once"
            dark={true}
        />
        <GridBlock 
            type="image" 
            imageUrl="https://placehold.co/1024x1024/webp" 
        />

      </div>

      {/* Final Radical Transparency Banner */}
      <section className="bg-white py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
            <Droplets size={300} className="text-[#121212]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tighter leading-none">Radical <span className="text-brand-green">Transparency</span></h2>
            <p className="text-slate-400 mb-12 text-xl leading-relaxed">
                We believe you should see exactly where your support goes. Our Live Impact Dashboard tracks every bag of waste, every volunteer hour, and every square meter restored in real-time.
            </p>
            <Link 
                to="/impact-dashboard" 
                className="inline-flex items-center px-12 py-5 bg-white text-brand-blue font-black rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-2xl group uppercase tracking-widest text-sm"
            >
                View Our Dashboard <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>
    </div>
  );
};
