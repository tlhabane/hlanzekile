import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { ChevronRight, ArrowRight, ArrowUpRight, CheckCircle2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_AREAS, MOCK_CLEANUPS, CHART_DATA } from '../services/mockData';

export const ImpactV1: React.FC = () => {
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const activeArea = selectedArea ? MOCK_AREAS.find((a) => a.id === selectedArea) : null;

    const activeCleanups = selectedArea
        ? MOCK_CLEANUPS.filter((c) => c.location.toLowerCase().includes(selectedArea.toLowerCase()))
        : MOCK_CLEANUPS;

    const totalCleanups = MOCK_CLEANUPS.length;
    const completedCleanups = MOCK_CLEANUPS.filter((c) => c.status === 'Completed').length;
    const upcomingCleanups = MOCK_CLEANUPS.filter((c) => c.status === 'Upcoming').length;
    const activePrograms = MOCK_AREAS.length + 1;

    const totalWaste = MOCK_AREAS.reduce((acc, curr) => acc + curr.totalWaste, 0);

    const getGaugeData = (areaId: string) => {
        const area = MOCK_AREAS.find((a) => a.id === areaId);
        if (!area) return [];
        const percentage = Math.round((area.totalWaste / totalWaste) * 100);
        return [
            { name: 'Contribution', value: percentage },
            { name: 'Rest', value: 100 - percentage },
        ];
    };

    const GaugeChart = ({ data, color }: { data: any[]; color: string }) => (
        <div className="relative h-[160px] w-full flex justify-center items-end">
            <div className="absolute inset-0 top-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={10}
                        >
                            <Cell key="val" fill={color} />
                            <Cell key="rest" fill="#e2e8f0" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="relative z-10 text-center mb-0 pb-2">
                <span className="text-4xl font-extrabold text-slate-800">{data[0].value}%</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Contribution
                </span>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in bg-slate-50 min-h-screen">
            <section className="bg-brand-blue pt-32 pb-32 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Our Impact Dashboard</h1>
                    <p className="text-blue-200">
                        Tracking our progress in real-time across the Braamfontein Spruit and Kliprivier.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                {activeArea ? `Waste Collected: ${activeArea.name}` : 'Total Waste Collected'}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Monthly breakdown of waste removal efforts (kg)
                            </p>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <button
                                onClick={() => setSelectedArea(null)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition ${!selectedArea ? 'bg-brand-green text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                Aggregate
                            </button>
                            {MOCK_AREAS.map((area) => (
                                <button
                                    key={area.id}
                                    onClick={() => setSelectedArea(area.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedArea === area.id ? 'bg-brand-green text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {area.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHART_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px',
                                    }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar
                                    dataKey="kgs"
                                    name="Waste Collected (Kgs)"
                                    fill={selectedArea ? '#009B4D' : '#003366'}
                                    radius={[20, 20, 20, 20]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mb-20">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">Project Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-brand-green rounded-2xl p-6 shadow-lg text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                                <ArrowUpRight size={64} />
                            </div>
                            <div className="flex justify-between items-start mb-4 text-green-100">Total Cleanups</div>
                            <div className="text-5xl font-bold mb-4">{totalCleanups}</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                            <div className="font-bold text-slate-800 mb-4">Completed</div>
                            <div className="text-5xl font-bold text-slate-800 mb-4">{completedCleanups}</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                            <div className="font-bold text-slate-800 mb-4">Active Programs</div>
                            <div className="text-5xl font-bold text-slate-800 mb-4">{activePrograms}</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                            <div className="font-bold text-slate-800 mb-4">Upcoming</div>
                            <div className="text-5xl font-bold text-slate-800 mb-4">{upcomingCleanups}</div>
                        </div>
                    </div>
                </div>

                <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Focus Areas</h2>
                        <div className="w-16 h-1 bg-brand-green mx-auto mb-8"></div>
                        <p className="text-lg text-slate-600">
                            Our commitment goes deeper. We actively promote sustainable practices and eco-friendly
                            solutions.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center">
                            <GaugeChart data={getGaugeData('bryanston')} color="#003366" />
                            <h3 className="text-2xl font-bold text-brand-blue mt-4">Braamfontein Spruit</h3>
                            <p className="text-slate-600 mt-4 mb-8">
                                Revitalizing the river banks and reducing plastic waste.
                            </p>
                            <Link
                                to="/get-involved"
                                className="px-8 py-3 bg-slate-100 text-brand-blue font-bold rounded-full"
                            >
                                Learn more
                            </Link>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center">
                            <GaugeChart data={getGaugeData('soweto')} color="#009B4D" />
                            <h3 className="text-2xl font-bold text-brand-blue mt-4">Kliprivier</h3>
                            <p className="text-slate-600 mt-4 mb-8">
                                Creating sustainable employment and educational opportunities.
                            </p>
                            <Link
                                to="/get-involved"
                                className="px-8 py-3 bg-slate-100 text-brand-blue font-bold rounded-full"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
