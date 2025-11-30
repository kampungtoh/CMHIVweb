import React from 'react';
import { Film, Globe, ExternalLink, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FilmSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
             {/* Decorative Background - Flowing Light */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-dark/20 skew-x-12 transform origin-top-right blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-blob"></div>
             
             <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">{t.filmTitle}</h2>
                    <p className="text-neutral-400 uppercase tracking-wider">{t.filmSubtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* 2024 Rachel */}
                    <div className="group bg-neutral-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-neutral-700">
                        <div className="h-64 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            {/* Shimmer */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"></div>
                            
                            <h3 className="text-5xl font-black text-white/90 tracking-widest relative z-10">Rachel</h3>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white">2024</span>
                                <span className="flex items-center gap-1 text-sm text-neutral-400">
                                    <Film className="w-4 h-4" /> Drama
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-light transition-colors">Rachel</h3>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                {t.filmRachelDesc}
                            </p>
                        </div>
                    </div>

                    {/* 2025 Eyes on Ukraine */}
                    <div className="group bg-neutral-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 border border-neutral-700">
                        <div className="h-64 relative overflow-hidden bg-neutral-700">
                             <img 
                                src="https://picsum.photos/800/600?random=1" 
                                alt="Eyes on Ukraine" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                             
                             {/* Shimmer */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"></div>

                             <div className="absolute bottom-4 left-6 z-10">
                                <h3 className="text-3xl font-black text-white drop-shadow-md">Eyes on Ukraine</h3>
                             </div>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-secondary text-neutral-900 px-3 py-1 rounded-full text-xs font-bold">2025</span>
                                <span className="flex items-center gap-1 text-sm text-neutral-400 border border-neutral-600 px-2 py-1 rounded-lg">
                                    <Film className="w-3 h-3" /> Dir. Mo Stoebe
                                </span>
                                <span className="flex items-center gap-1 text-sm text-neutral-400 border border-neutral-600 px-2 py-1 rounded-lg">
                                    <Clock className="w-3 h-3" /> 37 min
                                </span>
                                <span className="flex items-center gap-1 text-sm text-neutral-400 border border-neutral-600 px-2 py-1 rounded-lg">
                                    <Globe className="w-3 h-3" /> Documentary
                                </span>
                            </div>
                            
                            <p className="text-neutral-400 leading-relaxed mb-4">
                                {t.filmUkraineDesc}
                            </p>
                            
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-700">
                                <span className="text-sm font-semibold text-neutral-300">
                                    {t.filmProducer}
                                </span>
                                <a href="https://artglobalhealth.org/event/eyes-on-ukraine-premiere/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-white transition-colors font-bold text-sm uppercase tracking-wider">
                                    {t.filmOfficialSite} <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};

export default FilmSection;
