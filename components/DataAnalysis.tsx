import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { History, BarChart3, Lightbulb } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const DataAnalysis: React.FC = () => {
    const { t, language } = useLanguage();
    const [year, setYear] = useState<'2024' | '2025'>('2024');

    // Dynamic data labels based on language
    const getLabels = (key: string) => {
        const labels: Record<string, { zh: string, en: string }> = {
            'u': { zh: 'U=U 概念', en: 'U=U Concept' },
            'care': { zh: 'HIV 照護', en: 'HIV Care' },
            'law': { zh: '權益法規', en: 'Laws/Rights' },
            'prep': { zh: '針扎處置', en: 'Needlestick' },
            'prev': { zh: '防治觀念', en: 'Prevention' },
        };
        return labels[key][language];
    };

    const data2024 = [
      { subject: getLabels('u'), A: 78.9, B: 93.5, fullMark: 100 },
      { subject: getLabels('care'), A: 72, B: 89, fullMark: 100 },
      { subject: getLabels('law'), A: 68, B: 85, fullMark: 100 },
      { subject: getLabels('prep'), A: 75, B: 91, fullMark: 100 },
      { subject: getLabels('prev'), A: 70, B: 88, fullMark: 100 },
    ];

    const data2025 = [
      { subject: getLabels('u'), A: 80, B: 94, fullMark: 100 },
      { subject: getLabels('care'), A: 74, B: 93, fullMark: 100 },
      { subject: getLabels('law'), A: 70, B: 90, fullMark: 100 },
      { subject: getLabels('prep'), A: 76, B: 95, fullMark: 100 },
      { subject: getLabels('prev'), A: 72, B: 92, fullMark: 100 },
    ];

    const currentData = year === '2024' ? data2024 : data2025;
    const currentInsight = year === '2024' ? t.data2024Insight : t.data2025Insight;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">{t.dataTitle}</h2>
                    <p className="text-neutral-500 uppercase tracking-wider">{t.dataSubtitle}</p>
                </div>

                <div className="flex justify-center gap-4 mb-12">
                    <button 
                        onClick={() => setYear('2024')}
                        className={`group relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 border-2 
                        ${year === '2024' 
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                            : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary'}`}
                    >
                         {year === '2024' && <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>}
                        <History className="w-5 h-5" />
                        2024
                    </button>
                    <button 
                        onClick={() => setYear('2025')}
                        className={`group relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 border-2 
                        ${year === '2025' 
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                            : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary'}`}
                    >
                        {year === '2025' && <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>}
                        <BarChart3 className="w-5 h-5" />
                        2025
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 bg-neutral-50 rounded-3xl p-6 md:p-10 shadow-inner border border-neutral-100 relative">
                         {/* Subtle bg glow */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

                        <div className="h-[400px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 700 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name={language === 'zh' ? "前測 (Pre)" : "Pre-test"}
                                        dataKey="A"
                                        stroke="#0e7aa8"
                                        strokeWidth={3}
                                        fill="#0e7aa8"
                                        fillOpacity={0.2}
                                    />
                                    <Radar
                                        name={language === 'zh' ? "後測 (Post)" : "Post-test"}
                                        dataKey="B"
                                        stroke="#e0c23a"
                                        strokeWidth={3}
                                        fill="#e0c23a"
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                         <div className="bg-yellow-50 border-l-4 border-secondary p-8 rounded-r-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4 text-neutral-900">
                                <Lightbulb className="w-6 h-6 text-secondary" />
                                <h3 className="text-xl font-bold">{t.dataInsightTitle}</h3>
                            </div>
                            <p className="text-neutral-700 leading-relaxed">
                                {currentInsight}
                            </p>
                         </div>
                         <div className="text-center text-sm text-neutral-400">
                            {t.dataSource}
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DataAnalysis;
