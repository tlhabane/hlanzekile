import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_AREAS, AGGREGATE_IMPACT } from '../services/mockData';
import { CountdownTimer } from '../components/CountdownTimer';

const CustomBar = (props: any) => {
  const { x, y, width, height, isStriped } = props;
  if (isStriped) {
    return (
      <g>
        <defs>
          <pattern id="stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: '#003366', strokeWidth: 6, opacity: 0.8 }} />
          </pattern>
        </defs>
        <rect x={x} y={y} width={width} height={height} fill="#ffffff" ry={width / 12} />
        <rect x={x} y={y} width={width} height={height} fill="url(#stripes)" ry={width / 12} />
      </g>
    );
  }
  return <rect x={x} y={y} width={width} height={height} fill="#003366" ry={width / 12} />;
};

export const Impact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'bryanston' | 'soweto'>('all');
  
  const currentImpact = activeTab === 'all' 
    ? AGGREGATE_IMPACT 
    : MOCK_AREAS.find(a => a.id === activeTab)!.impact;

  const totalWasteAll = AGGREGATE_IMPACT.totalWasteKgs;

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-blue pt-32 pb-40 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Our Impact</h1>
          <p className="text-blue-100 text-xl md:text-2xl max-w-6xl mx-auto leading-relaxed font-light mb-12 opacity-90">Track our progress in real-time across the Braamfontein Spruit and Kliprivier.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24 -mt-24 space-y-12">
        {/* Main Chart Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-slate-50">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Harmful Waste Collected (kgs)</h2>
            <div className="flex justify-center gap-3">
              {['all', 'bryanston', 'soweto'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === t ? 'bg-brand-green text-white shadow-lg scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[450px] w-full mt-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentImpact.categories} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid vertical={false} strokeDasharray="5 5" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                  angle={0}
                  interval={0}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  domain={[0, 3000]}
                  ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar 
                  dataKey="kgs" 
                  shape={<CustomBar />} 
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Cleanups', value: `${currentImpact.totalCleanups}`, sub: 'Weekends', dark: true },
            { label: 'Period', value: `${currentImpact.periodMonths}`, sub: 'Months' },
            { label: 'Total Waste', value: `${(currentImpact.totalWasteKgs / 1000).toFixed(0)}k+`, sub: 'Kilograms', dark: true },
            { label: 'People', value: `${currentImpact.stewards}+`, sub: 'Stewards' }
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

        {/* Focus Areas */}
        <section className="py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Our Focus Areas</h2>
            <div className="w-16 h-1 bg-brand-green mx-auto mb-8"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">Our commitment goes deeper. We actively promote sustainable practices and eco-friendly solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {MOCK_AREAS.map(area => {
              const perc = Math.round((area.totalWaste / totalWasteAll) * 100);
              const data = [{ value: perc }, { value: 100 - perc }];
              return (
                <div key={area.id} className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-50 flex flex-col items-center text-center">
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
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(area.totalWaste / 1000).toFixed(2)}k</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue mt-4">{area.fullName}</h3>
                  <p className="text-slate-500 text-sm mb-10 leading-relaxed font-light line-clamp-2">{area.description}</p>
                  <Link 
                    to={`/impact/${area.id}`} 
                    className="px-10 py-3 bg-blue-50 text-brand-blue font-bold rounded-full hover:bg-blue-100 transition flex items-center gap-2 group"
                  >
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
    </div>
  );
};