import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { Calendar, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_AREAS, AGGREGATE_IMPACT } from '../services/mockData';
import { CountdownTimer } from '../components/CountdownTimer';
import { ImpactStoriesCarousel } from '../components/ImpactStoriesCarousel';
import { CustomBar } from '@/components/CustomBar';
import { Headers } from '@/assets/headers';

const HeaderImage = Headers.ourImpact;

export const Impact: React.FC = () => {
    window.document.title = 'Our Impact :: Hlanzekile River & Ocean Cleaning';
    const [selectedYear, setSelectedYear] = useState<number>(2025);

    const yearlyData = AGGREGATE_IMPACT.history.find(h => h.year === selectedYear)?.data || [];
    const totalWasteAll = AGGREGATE_IMPACT.totalWasteKgs;

    return (
        <div className="animate-fade-in bg-slate-50 min-h-screen">
            {/* Hero Header */}
            <section className="pt-32 pb-40 text-white relative text-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={HeaderImage.url}
                        alt="Our Impact | Hlanzekile River & Ocean Cleaning"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-green/70 mix-blend-multiply" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Our Impact</h1>
                    <p className="text-blue-100 text-xl md:text-2xl max-w-6xl mx-auto leading-relaxed font-light mb-12 opacity-90">
                        Track our progress in real-time across the Braamfontein Spruit and Kliprivier.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 pb-24 -mt-24 space-y-12 relative z-20">
                {/* Main Chart Card */}
                <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-slate-50">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                <Calendar className="text-brand-green" /> Waste Collected Per Month
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">Aggregate statistics for all focus areas.</p>
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

                    <div className="h-[450px] w-full mt-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                                <CartesianGrid vertical={false} strokeDasharray="5 5" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                    label={{ value: 'Kgs', angle: -90, position: 'insideLeft', offset: 10, fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar
                                    dataKey="kgs"
                                    shape={<CustomBar />}
                                    barSize={50}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Cleanups', value: `${AGGREGATE_IMPACT.totalCleanups}`, sub: 'Events to date', dark: true },
                        { label: 'Active Focus', value: `${MOCK_AREAS.length}`, sub: 'Key Locations' },
                        { label: 'Total Waste', value: `${(AGGREGATE_IMPACT.totalWasteKgs / 1000).toFixed(1)}k`, sub: 'Kilograms Removed', dark: true },
                        { label: 'Community', value: `${AGGREGATE_IMPACT.stewards}+`, sub: 'Active Stewards' }
                    ].map((m, i) => (
                        <div key={i} className={`rounded-2xl p-8 shadow-xl border border-slate-100 ${m.dark ? 'bg-brand-blue text-white' : 'bg-white'}`}>
                              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-4 ${m.dark ? 'text-blue-200' : 'text-slate-400'}`}>
                                {m.label}
                              </span>
                            <div className="text-6xl font-black mb-1 tracking-tighter">{m.value}</div>
                            <span className={`text-sm font-bold opacity-80 ${m.dark ? 'text-white' : 'text-slate-800'}`}>{m.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Next Cleanup Section */}
            <section className="bg-white py-32 text-center">
                <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Our Next Cleanup</h2>
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

            {/* Focus Areas */}
            <section className="py-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Our Focus Areas</h2>
                    <div className="w-16 h-1 bg-brand-green mx-auto mb-8"></div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        Our commitment goes deeper. We actively promote sustainable practices and eco-friendly
                        solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {MOCK_AREAS.map((area) => {
                        const perc = Math.round((area.totalWaste / totalWasteAll) * 100);
                        const data = [{ value: perc }, { value: 100 - perc }];
                        return (
                            <div
                                key={area.id}
                                className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-50 flex flex-col items-center text-center"
                            >
                                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data}
                                                innerRadius={65}
                                                outerRadius={80}
                                                startAngle={210}
                                                endAngle={-30}
                                                paddingAngle={0}
                                                dataKey="value"
                                                stroke="none"
                                                cornerRadius={10}
                                            >
                                                <Cell fill="#003366" />
                                                <Cell fill="#e2e8f0" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute bottom-12 flex flex-col items-center">
                                        <span className="text-4xl font-black text-slate-800 leading-none">{perc}%</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {(area.totalWaste / 1000).toFixed(2)}k
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-brand-blue mt-4">{area.fullName}</h3>
                                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-light line-clamp-2">
                                    {area.description}
                                </p>
                                <Link
                                    to={`/impact/${area.id}`}
                                    className="px-10 py-3 bg-blue-50 text-brand-blue font-bold rounded-full hover:bg-blue-100 transition flex items-center gap-2 group"
                                >
                                    Learn more{' '}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Impact Stories Carousel */}
            <section className="py-24 bg-white overflow-hidden">
                <ImpactStoriesCarousel />
            </section>
        </div>
    );
};
