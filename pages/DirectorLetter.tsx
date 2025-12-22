import React from 'react';
import { Quote, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DirectorLetter: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/about" className="inline-flex items-center text-slate-500 hover:text-brand-blue mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to About Us
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12 items-start mb-12">
            <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">A Letter from Our Director</h1>
                <div className="h-1 w-20 bg-brand-green mb-8"></div>
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                    "We are not just cleaning rivers; we are creating a movement that empowers communities and restores the dignity of our environment."
                </p>
            </div>
            <div className="w-full md:w-1/3">
                 <img 
                    src="https://picsum.photos/seed/floyd/600/800" 
                    alt="Floyd Nyai" 
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
                 <div className="mt-4 text-center md:text-left">
                    <p className="font-bold text-slate-800 text-lg">Floyd Nyai</p>
                    <p className="text-slate-500 text-sm uppercase tracking-wide">Founder & Director</p>
                </div>
            </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
            <p>
                Having spent a significant portion of my career within the cleaning industry, it became the field I was most at ease with. But as I reflected on my journey, a nagging question persisted - how could I use my expertise to make a meaningful contribution to my community?
            </p>
            <p>
                Years of working in some of South Africa's most disadvantaged areas exposed me to a grave problem - waste management and illegal dumping. It was disheartening to witness how a substantial portion of this waste ended up in our rivers, choking the life out of ecosystems that should be vibrant and thriving.
            </p>
            <p>
                The Braamfontein Spruit, a river that runs through the heart of our city, became a symbol of this crisis for me. Seeing it clogged with plastic and debris was a call to action I could no longer ignore.
            </p>
            <p>
                Driven by a deep sense of responsibility, I established Hlanzekile River and Ocean Cleaning. Our mission was clear - to tackle the plastic pollution crisis head-on. But we knew that cleaning alone wasn't enough. We needed to address the root causes and involve the community in the solution.
            </p>
            <p>
                Today, Hlanzekile is more than just a cleanup crew. We are an educational force, teaching the youth about environmental stewardship. We are an economic engine, creating jobs through our upcycling initiatives in Soweto. We are a community of passionate individuals dedicated to a cleaner, greener South Africa.
            </p>
            <p>
                We extend an invitation to you to join us. Whether you volunteer your time, sponsor a grid, or simply spread the word, you are helping us build a legacy of sustainability. Be a part of the solution.
            </p>
            <br/>
            <p className="font-handwriting text-3xl text-brand-blue pt-8">
                Floyd Nyai
            </p>
        </div>
      </div>
    </div>
  );
};