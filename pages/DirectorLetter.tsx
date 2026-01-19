import React from 'react';
import { ArrowLeft, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImpactStoriesCarousel } from '../components/ImpactStoriesCarousel';
import { Headers } from '@/assets/headers';

const HeaderImage = Headers.directorLetter;
const DirectorMain = Headers.directorMain;

export const DirectorLetter: React.FC = () => {
    window.document.title = 'Letter from our Director :: Hlanzekile River & Ocean Cleaning';
    return (
        <div className="animate-fade-in bg-white min-h-screen">
            {/* Blue Header Section */}
            <section className="pt-32 pb-48 text-white relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={HeaderImage.url}
                        alt="Letter from our Director | Floyd Nyai | Hlanzekile River & Ocean Cleaning"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-green/70 mix-blend-multiply" />
                </div>
                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Quote size={400} />
                </div>

                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    {/* Navigation Link */}
                    <Link
                        to="/about"
                        className="inline-flex items-center text-blue-200 hover:text-white mb-10 transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to about us
                    </Link>

                    <div className="text-left">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                            Letter from our<br />Founder & Director,<br />
                            <span className="text-brand-yellow">Floyd Nyai</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-light leading-relaxed max-w-2xl italic">
                            "We are not just cleaning rivers; we are creating a movement that empowers communities and restores the dignity of our environment."
                        </p>
                    </div>
                </div>
            </section>

            {/* Overlapping Image Card */}
            <section className="relative z-20 px-6 -mt-32">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="rounded-[2rem] overflow-hidden aspect-[16/9] relative">
                            <img
                                src={DirectorMain.url}
                                alt="Floyd Nyai - Director"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Letter Content Section */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <div className="flex items-center gap-4 mb-12">
                            <span className="h-px bg-brand-green flex-grow"></span>
                            <p className="text-[10px] font-black text-brand-green uppercase tracking-[0.4em] whitespace-nowrap">
                                April 2024 • Soweto, South Africa
                            </p>
                            <span className="h-px bg-brand-green flex-grow"></span>
                        </div>

                        <div className="space-y-8 text-slate-600 font-light leading-relaxed">
                            <p>
                                Having spent a significant portion of my career within the cleaning industry, it became the field I was most at ease with. But as I reflected on my journey, a nagging question persisted — how could I use my expertise to make a meaningful contribution to my community?
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
                                Today, Hlanzekile accounts for much more than just a cleanup crew. We are an educational force, teaching the youth about environmental stewardship. We are an economic engine, creating jobs through our upcycling initiatives in Soweto. We are a community of passionate individuals dedicated to a cleaner, greener South Africa.
                            </p>

                            <p>
                                Building this platform has required a willingness to challenge orthodoxies and reinvent—sometimes even disrupt—ourselves. Over the past year, as the needs and preferences of our environment have changed, we've changed too.
                            </p>

                            <p>
                                I want to close with my commitment to you: I won’t be perfect, but I will listen to you; I will ensure that we treat our environment, our colleagues, and our cities with respect; and I will run our organization with passion, humility, and integrity.
                            </p>
                        </div>

                        <div className="mt-20 pt-10 border-t border-slate-100 flex items-end justify-between">
                            <div>
                                <p className="font-black text-brand-blue text-2xl uppercase tracking-tighter mb-1">Floyd Nyai</p>
                                <p className="text-brand-green text-xs font-black uppercase tracking-widest">Founder & Director, Hlanzekile</p>
                            </div>
                            <div className="w-24 h-24 opacity-10">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Signature_of_Floyd_Mayweather_Jr.png" alt="Signature" className="w-full h-full object-contain grayscale" />
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Impact Stories Carousel */}
            <section className="py-24 bg-slate-50 overflow-hidden">
                <ImpactStoriesCarousel />
            </section>
        </div>
    );
};