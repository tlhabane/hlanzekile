import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Heart, ArrowRight, MapPin } from 'lucide-react';
import { CustomBar } from '@/components/CustomBar';
import { MOCK_AREAS } from '../services/mockData';
import { CountdownTimer } from '../components/CountdownTimer';
import { ImageCarousel } from "@/components/ImageCarousel";
import { ImpactStoriesCarousel } from "@/components/ImpactStoriesCarousel";


export const ImpactAreaDetail: React.FC = () => {
    const { areaId } = useParams<{ areaId: string }>();
    const area = MOCK_AREAS.find((a) => a.id === areaId);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedYear, setSelectedYear] = useState<number>(2025);

    if (!area) {
        window.document.title = 'Area not found :: Hlanzekile River & Ocean Cleaning';
        return (
            <div className="pt-40 text-center pb-20">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Area not found</h2>
                <Link to="/impact" className="text-brand-blue font-bold hover:underline">Back to Impact Dashboard</Link>
            </div>
        );
    }

    window.document.title = `${area.fullName} :: Hlanzekile River & Ocean Cleaning`;
    const yearlyData = area.impact.history.find(h => h.year === selectedYear)?.data || [];

    return (
        <div className="animate-fade-in bg-slate-50 min-h-screen">
            {/* Map Hero - Full Viewport */}
            <section className="relative h-screen w-full z-0 overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${area.coordinates.lng}!3d${area.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v123456789`}
                    className="filter grayscale-[30%] opacity-80"
                    title={`Map of ${area.fullName}`}
                />
                {/* Navigation Contrast Overlay */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

                {/* Visual Cue for scroll */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-brand-blue text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                        Scroll for Impact
                    </span>
                    <div className="w-1 h-8 bg-brand-green/50 rounded-full" />
                </div>

                {/* Map Pin Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="bg-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-pulse">
                        <MapPin className="text-brand-green fill-brand-green/20" />
                        <span className="font-black text-brand-blue uppercase tracking-widest text-base">
                            {area.fullName}
                        </span>
                    </div>
                </div>
            </section>

            {/* Overlapping Dashboard */}
            <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10 space-y-12">
                <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-slate-50">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                <Calendar className="text-brand-green" /> Monthly Waste History
                            </h2>
                            <p className="text-xs font-bold text-brand-blue uppercase tracking-widest opacity-60">{area.name}</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                            {[2023, 2024, 2025].map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                                        selectedYear === year ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                                <CartesianGrid vertical={false} strokeDasharray="5 5" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="month" axisLine={false} tickLine={false} dy={15}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis
                                    axisLine={false} tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="kgs" shape={<CustomBar />} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4 Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Cleanups', value: `${area.impact.totalCleanups}`, sub: 'Events', dark: true },
                        { label: 'Period', value: `${area.impact.periodMonths}`, sub: 'Months Tracking' },
                        { label: 'Total Waste', value: `${(area.impact.totalWasteKgs / 1000).toFixed(1)}k`, sub: 'Kilograms', dark: true },
                        { label: 'Stewards', value: `${area.impact.stewards}+`, sub: 'Local Heroes' }
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
            </div>
            {/* Work in Progress */}
            <section className="py-24 bg-white">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
                        Our Work in {area.name}
                    </h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto"></div>
                </div>

                <div className="relative py-12">
                    <ImageCarousel media={area.gallery.map((url) => ({ url, type: 'image' }))} />
                </div>

                {/* Refined Content Sections from Company Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {area.contentSections.map((section, idx) => (
                        <p key={idx} className="text-slate-600 font-light leading-relaxed text-sm md:text-base">
                            {section}
                        </p>
                    ))}
                </div>
            </section>

            {/* Next Cleanup Section */}
            <section className="py-24 bg-slate-50 text-center">
                <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
                    Our Next Cleanup
                </h2>
                <div className="w-16 h-1 bg-brand-green mx-auto mb-12"></div>
                <p className="text-slate-500 max-w-xl mx-auto mb-20 text-sm">
                    Your contribution helps us transform more waste into economic opportunities.
                </p>

                <CountdownTimer />

                <div className="mt-24 flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="https://pay.yoco.com/hlanzekile-river-and-ocean-cleaning-npc"
                        target="_blank"
                        className="px-12 py-5 bg-brand-green text-white font-black rounded-full hover:bg-green-600 transition shadow-2xl flex items-center justify-center gap-2 group tracking-widest uppercase text-sm"
                    >
                        Donate Today <Heart className="w-5 h-5 group-hover:fill-current" />
                    </Link>
                    <Link
                        to="/volunteer"
                        className="px-12 py-5 bg-blue-50 text-brand-blue font-black rounded-full hover:bg-blue-100 transition shadow-md flex items-center justify-center gap-2 group tracking-widest uppercase text-sm"
                    >
                        Volunteer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Impact Stories Carousel */}
            <section className="py-24 bg-white overflow-hidden">
                <ImpactStoriesCarousel areaName={area.name} />
            </section>
        </div>
    );
};
