import React, { useState, useEffect, useRef } from 'react';
import { AGGREGATE_IMPACT } from '@/services/mockData';

const useCountUp = (end: number, duration: number = 2000, start: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;

            if (progress < duration) {
                // easeOutQuart easing for smooth settling
                const percentage = 1 - Math.pow(1 - progress / duration, 4);
                setCount(Math.floor(end * percentage));
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, start]);

    return count;
};

export const KeyMetrics: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Trigger only once
                }
            },
            { threshold: 0.2 }, // Start when 20% visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const wasteCount = useCountUp(+AGGREGATE_IMPACT.totalWasteKgs.toFixed(0), 2500, isVisible);
    const avgCount = useCountUp(300, 2000, isVisible);
    const riversCount = useCountUp(2, 1500, isVisible);

    return (
        <section
            ref={containerRef}
            className="py-12 bg-white -mt-10 relative z-20 max-w-6xl mx-auto rounded-xl shadow-xl border border-slate-100 mb-16"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-6">
                    <div className="text-5xl font-black text-brand-green mb-2 tabular-nums">
                        {wasteCount.toLocaleString()}+
                    </div>
                    <div className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
                        Kgs Waste Collected
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-5xl font-black text-brand-blue mb-2 tabular-nums">
                        {avgCount.toLocaleString()}
                    </div>
                    <div className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
                        Avg Kgs Per Clean
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-5xl font-black text-brand-yellow mb-2 tabular-nums">{riversCount}</div>
                    <div className="text-sm uppercase tracking-widest text-slate-500 font-semibold">Primary Rivers</div>
                </div>
            </div>
        </section>
    );
};
