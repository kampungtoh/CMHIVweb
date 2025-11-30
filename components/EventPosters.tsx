import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const EventPosters: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="event-history" className="py-24 bg-neutral-50 relative overflow-hidden">
            {/* Background elements - Subtle flowing light */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                        {t.posterTitle}
                    </h2>
                    <p className="text-neutral-500 font-mono tracking-wider uppercase">{t.posterSubtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">
                    {/* 2024 Poster */}
                    <div className="group relative perspective-1000">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-1 border border-neutral-100 overflow-hidden">
                            
                            {/* Poster Image Container */}
                            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-200 relative mb-6 group-hover:shadow-inner">
                                {/* Light Shimmer Effect over image */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 pointer-events-none"></div>

                                <img 
                                    src="assets/Carnival POster.jpg" 
                                    alt="2024 Event Poster" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/0e7aa8/ffffff?text=2024+Poster';
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-neutral-900 shadow-sm z-10">
                                    2024
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-primary mb-2">2024 Carnival</h3>
                                <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.poster2024Date}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Chi Mei</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2025 Poster - Highlighted */}
                    <div className="group relative perspective-1000">
                        {/* Animated Glow behind card */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-secondary/30 to-yellow-500/30 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow"></div>
                        
                        <div className="relative bg-white p-4 rounded-2xl shadow-2xl transition-all duration-500 transform scale-105 group-hover:-translate-y-2 group-hover:-rotate-1 border-2 border-secondary/20 overflow-hidden">
                            
                            {/* Poster Image Container */}
                            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-200 relative mb-6">
                                {/* Light Shimmer Effect over image */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"></div>

                                <img 
                                    src="assets/2025Poster.jpg" 
                                    alt="2025 Event Poster" 
                                    className="w-full h-full object-cover"
                                     onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/e0c23a/10212a?text=2025+Poster';
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-secondary text-neutral-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                                    2025
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">2025 Carnival</h3>
                                <p className="text-primary font-medium mb-3">{t.poster2025Highlight}</p>
                                <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.poster2025Date}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Chi Mei</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventPosters;
