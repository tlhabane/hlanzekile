import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, Heart, Recycle, ChevronRight, ChevronLeft } from 'lucide-react';
import { ProcessAccordion, ProcessStep } from '../components/ProcessAccordion';
import { KeyMetrics } from '../components/KeyMetrics';
import { ImpactStoriesCarousel } from '../components/ImpactStoriesCarousel';

// Slides Data
const SLIDES = [
  {
    id: 1,
    image: "https://placehold.co/1920x1080/webp",
    title: <>Reviving Rivers.<br/><span className="text-brand-yellow">Restoring Life.</span></>,
    description: "We are on a mission to clean up our water bodies and revive them as vibrant, thriving ecosystems.",
  },
  {
    id: 2,
    image: "https://placehold.co/1920x1080/webp",
    title: <>9,000+ Kgs of Waste<br/><span className="text-brand-yellow">Removed.</span></>,
    description: "Making a tangible difference in the Braamfontein Spruit and Kliprivier ecosystems, one cleanup at a time.",
  },
  {
    id: 3,
    image: "https://placehold.co/1920x1080/webp",
    title: <>Transforming Waste<br/><span className="text-brand-yellow">Into Opportunity.</span></>,
    description: "Our upcycling initiative in Soweto turns plastic waste into everyday products, creating sustainable employment for local youth.",
  },
  {
    id: 4,
    image: "https://placehold.co/1920x1080/webp",
    title: <>A Cleaner Future<br/><span className="text-brand-yellow">For South Africa.</span></>,
    description: "Join us in our journey to restore the natural purity of our wetlands and protect our water resources for generations to come.",
  }
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'collect',
    title: 'Collecting & Weighing',
    description: 'Our dedicated team conducts regular clean-up campaigns. After each clean, they meticulously collect and weigh the plastic waste retrieved to determine the scale of the issue.',
    image: 'https://placehold.co/1080x1080/webp'
  },
  {
    id: 'sort',
    title: 'Sorting The Waste',
    description: 'Collected waste is sorted to categorise different types of plastic materials. This sorting process is essential for efficient recycling and helps identify pollution trends.',
    image: 'https://placehold.co/1080x1080/webp'
  },
  {
    id: 'audit',
    title: 'Brand Auditing',
    description: 'We identify sources of plastic pollution by tracking brands on items. This allows us to engage companies to promote responsible packaging.',
    image: 'https://placehold.co/1080x1080/webp'
  },
  {
    id: 'resell',
    title: 'Directing to Resellers',
    description: 'We ensure plastic waste is allocated to correct recycling facilities to prevent landfill use, promoting the circular economy.',
    image: 'https://placehold.co/1080x1080/webp'
  }
];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 group">
        {/* Background Images */}
        {SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={slide.image} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-green/70 mix-blend-multiply"></div>
          </div>
        ))}

        {/* Content Layer */}
        <div className="relative z-20 w-full max-w-[95%] md:max-w-[90%] mx-auto px-4 text-center flex flex-col items-center justify-center h-full pt-20">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/50 text-sm font-semibold mb-8 backdrop-blur-sm animate-fade-in">
                Established 2023
            </span>
          
            {/* Text Carousel */}
            <div className="relative w-full h-[350px] md:h-[300px] flex items-center justify-center">
                {SLIDES.map((slide, index) => (
                    <div 
                        key={slide.id} 
                        className={`absolute top-0 w-full md:w-[85%] px-4 transition-all duration-700 transform ${
                            index === currentSlide 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                        }`}
                    >
                        <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                            {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-100 max-w-6xl mx-auto leading-relaxed">
                            {slide.description}
                        </p>
                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 md:mt-8">
                            <Link 
                                to="/get-involved" 
                                className="px-8 py-4 bg-brand-green text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg flex items-center justify-center"
                            >
                                Donate Today <Heart className="ml-2 w-5 h-5" />
                            </Link>
                            <Link 
                                to="/impact" 
                                className="px-8 py-4 bg-white text-brand-blue font-bold rounded-lg hover:bg-slate-100 transition shadow-lg flex items-center justify-center"
                            >
                                See Our Impact <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Slider Controls */}
        <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition hidden md:flex backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Previous Slide"
        >
            <ChevronLeft size={32} />
        </button>
        <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition hidden md:flex backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Next Slide"
        >
            <ChevronRight size={32} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {SLIDES.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-brand-yellow w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </section>

      {/* Key Metric Highlight */}
      <KeyMetrics />

      {/* Brief About Us */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24">
         <h2 className="text-3xl font-bold text-slate-800 mb-6">More Than Just A Cleanup Crew</h2>
         <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Hlanzekile is a movement born from the need to restore the Braamfontein Spruit. What started as a small team has grown into a community-driven initiative that not only cleans rivers but empowers the youth of Soweto through upcycling and education.
         </p>
         <Link 
            to="/about" 
            className="inline-flex items-center px-6 py-3 border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition duration-300"
         >
            Read Our Full Story <ArrowRight className="ml-2 w-4 h-4" />
         </Link>
      </section>

      {/* Interactive Vision Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Vision</h2>
                <div className="w-20 h-1 bg-brand-green mx-auto"></div>
            </div>

            {/* Adjusted height: 500px for mobile, 350px for md and up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px] md:h-[350px]">
                {/* Vision 01 */}
                <div className="group relative rounded-2xl overflow-hidden shadow-lg h-full cursor-pointer">
                    <img src="https://placehold.co/800x800/webp" alt="Restoration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Restoration</h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                             <p className="text-blue-100 leading-relaxed mt-4">
                                To restore the natural purity of South Africa's rivers and wetlands through impactful clean-up initiatives. We aim to revive the Braamfontein Spruit and other water bodies into vibrant, thriving ecosystems.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vision 02 */}
                <div className="group relative rounded-2xl overflow-hidden shadow-lg h-full cursor-pointer">
                    <img src="https://placehold.co/800x800/webp" alt="Transformation" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                         <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20">
                            <Recycle size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Transformation</h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <p className="text-green-50 leading-relaxed mt-4">
                                Transforming plastic waste into opportunity. We envision a future where waste is given renewed purpose—transformed into everyday products like pens, driving sustainability and social impact through job creation in Soweto.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Process Accordion Component */}
      <section className="py-24 lg:py-0 bg-white w-full">
        <ProcessAccordion 
          steps={PROCESS_STEPS} 
          title="Our Process"
          intro="We follow a systematic approach to environmental stewardship. That's how we transform waste, into opportunity."
        />
      </section>

      {/* Impact Stories Carousel */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <ImpactStoriesCarousel />
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to make a difference?</h2>
            <p className="text-xl text-blue-100 mb-10">
                Whether you donate, volunteer, or sponsor a grid, your contribution directly restores our rivers and empowers communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/get-involved" className="px-8 py-4 bg-brand-green text-white font-bold rounded-full hover:bg-green-600 transition shadow-lg transform hover:-translate-y-1">
                    Get Involved Today
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-brand-blue transition">
                    Contact Us
                </Link>
            </div>
        </div>
      </section>

      {/* Newsletter Signup - Updated Style */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Stay Updated with Hlanzekile</h3>
                    <p className="text-slate-600">
                        Join our mailing list to get the latest updates on cleanup events, upcycling projects, and success stories.
                    </p>
                </div>
                <div className="md:w-1/2 w-full">
                    <form className="relative" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="w-full pl-6 pr-14 py-4 rounded-full border border-slate-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-white shadow-sm"
                            required 
                        />
                        <button 
                            type="submit" 
                            className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-blue text-white rounded-full hover:bg-blue-900 transition flex items-center justify-center shadow-md"
                            aria-label="Sign Up"
                        >
                             <ChevronRight size={24} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};