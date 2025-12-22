import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 18, minutes: 45, seconds: 2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Slot = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      {/* Size increased by ~30% from original version */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-28 h-36 md:w-44 md:h-52 flex items-center justify-center text-5xl md:text-8xl font-black text-brand-blue mb-4 border border-slate-50">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-[0.4em]">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 md:gap-8">
      <Slot value={timeLeft.days} label="Days" />
      <span className="text-4xl md:text-7xl font-black text-brand-blue mb-12 md:mb-16">:</span>
      <Slot value={timeLeft.hours} label="Hours" />
      <span className="text-4xl md:text-7xl font-black text-brand-blue mb-12 md:mb-16">:</span>
      <Slot value={timeLeft.minutes} label="Minutes" />
      <span className="flex items-center justify-center gap-2 md:gap-8 hidden lg:flex">
        <span className="text-4xl md:text-7xl font-black text-brand-blue mb-12 md:mb-16">:</span>
        <Slot value={timeLeft.seconds} label="Seconds" />
      </span>
    </div>
  );
};