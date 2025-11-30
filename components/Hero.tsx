import React from 'react';
import { Activity, Sparkles, ArrowDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Hero: React.FC = () => {
    const { t } = useLanguage();
    
    const scrollToContent = () => {
        const nextSection = document.getElementById('event-history');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
            {/* Tech Background - Grid & Flowing Light Effects */}
            <div className="absolute inset-0 z-0">
                {/* Static Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Deep background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-primary-dark/40"></div>
                
                {/* Animated "Aurora" Blobs */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
                
                {/* Moving Sheen Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 animate-pulse-slow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full mb-8 border border-white/10 animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
                    <Activity className="w-4 h-4 text-secondary animate-pulse" />
                    <span className="text-sm font-mono tracking-wider text-secondary-light uppercase">{t.heroTag}</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-none drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {t.heroTitlePrefix}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-light via-white to-secondary-light animate-gradient-x bg-[length:200%_auto]">
                        {t.heroTitleSuffix}
                    </span>
                </h1>
                
                <div className="text-2xl md:text-3xl font-bold text-neutral-200 mb-8 animate-fade-in-up flex flex-col md:flex-row items-center justify-center gap-2" style={{ animationDelay: '0.2s' }}>
                    <span>{t.heroSubtitleZh}</span>
                    <span className="hidden md:inline text-neutral-600">|</span>
                    <span className="text-xl md:text-2xl font-light text-primary-light">{t.heroSubtitleEn}</span>
                </div>
                
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 leading-relaxed mb-12 animate-fade-in-up font-light" style={{ animationDelay: '0.3s' }}>
                    {t.heroDesc}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <button 
                        onClick={scrollToContent}
                        className="group relative overflow-hidden bg-secondary hover:bg-white text-neutral-900 hover:text-primary-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(224,194,58,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2"
                    >
                         {/* Button Shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
                        
                        <span className="relative z-20 flex items-center gap-2">
                            {t.heroButton}
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </span>
                    </button>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm font-mono">
                        <Sparkles className="w-4 h-4 text-primary-light" />
                        <span>Impact Report</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
