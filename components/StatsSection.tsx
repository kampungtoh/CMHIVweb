import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Users, CheckCircle, MessageCircleHeart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    description: string;
    growth?: string;
    isHighlight?: boolean;
    icon: React.ReactNode;
    delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, suffix = '', prefix = '', description, growth, isHighlight, icon, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const increment = value / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(start));
                        }
                    }, 16);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [value]);

    return (
        <div 
            ref={cardRef}
            className={`group relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden
            ${isHighlight 
                ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl shadow-primary/30' 
                : 'bg-white text-neutral-900 shadow-lg border border-neutral-100 hover:shadow-xl'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
             {/* Card Shimmer */}
             <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-20">
                <span className={`text-sm font-bold tracking-wider uppercase ${isHighlight ? 'text-white/80' : 'text-neutral-500'}`}>
                    {label}
                </span>
                <div className={`p-2 rounded-full ${isHighlight ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                    {icon}
                </div>
            </div>
            
            <div className="flex items-baseline gap-2 mb-2 relative z-20">
                <span className={`text-5xl font-black ${isHighlight ? 'text-secondary-light' : 'text-primary'}`}>
                    {prefix}{count}{suffix}
                </span>
                {growth && (
                    <span className="flex items-center text-sm font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        {growth}
                    </span>
                )}
            </div>
            
            <p className={`text-sm font-medium relative z-20 ${isHighlight ? 'text-white/90' : 'text-neutral-500'}`}>
                {description}
            </p>
        </div>
    );
};

const StatsSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="stats-section" className="py-24 bg-neutral-50 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                        {t.statsTitle}
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto tracking-wider uppercase">
                        {t.statsSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        label={t.statLabel2024}
                        value={106}
                        description={t.statDesc2024}
                        icon={<Users className="w-5 h-5" />}
                        delay={0}
                    />
                    <StatCard 
                        label={t.statLabel2025}
                        value={275}
                        growth="159%"
                        description={t.statDesc2025}
                        isHighlight={true}
                        icon={<Users className="w-5 h-5" />}
                        delay={100}
                    />
                    <StatCard 
                        label={t.statLabelImpact}
                        value={128}
                        prefix="+"
                        description={t.statDescImpact}
                        icon={<CheckCircle className="w-5 h-5" />}
                        delay={200}
                    />
                    <StatCard 
                        label={t.statLabelFeedback}
                        value={275}
                        suffix="+"
                        description={t.statDescFeedback}
                        icon={<MessageCircleHeart className="w-5 h-5" />}
                        delay={300}
                    />
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
