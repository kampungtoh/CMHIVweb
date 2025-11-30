import React, { useState } from 'react';
import { Camera, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const GallerySection: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'2025' | '2024'>('2025');
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Mock images - in a real app, these would be real paths
    const images2024 = [
        "https://picsum.photos/600/400?random=10",
        "https://picsum.photos/600/400?random=11",
        "https://picsum.photos/600/400?random=12",
        "https://picsum.photos/600/400?random=13"
    ];

    const images2025 = [
         "https://picsum.photos/600/400?random=20",
         "https://picsum.photos/600/400?random=21",
         "https://picsum.photos/600/400?random=22",
         "https://picsum.photos/600/400?random=23"
    ];

    const currentImages = activeTab === '2025' ? images2025 : images2024;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-2">{t.galleryTitle}</h2>
                        <p className="text-neutral-500 uppercase tracking-wider">{t.gallerySubtitle}</p>
                    </div>
                    
                    <div className="flex bg-neutral-100 p-1 rounded-full">
                        <button 
                            onClick={() => setActiveTab('2025')}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === '2025' ? 'bg-white text-primary shadow-md' : 'text-neutral-500 hover:text-neutral-900'}`}
                        >
                            2025
                        </button>
                        <button 
                            onClick={() => setActiveTab('2024')}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === '2024' ? 'bg-white text-primary shadow-md' : 'text-neutral-500 hover:text-neutral-900'}`}
                        >
                            2024
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentImages.map((src, idx) => (
                        <div 
                            key={idx} 
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                            onClick={() => setLightboxImage(src)}
                        >
                            <img src={src} alt={`Gallery ${activeTab} ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                                    <Camera className="w-6 h-6" />
                                </div>
                            </div>
                            {/* New Badge with flow */}
                            {activeTab === '2025' && idx === 0 && (
                                <div className="absolute top-4 left-4 bg-secondary text-neutral-900 text-xs font-bold px-3 py-1 rounded-full overflow-hidden">
                                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-white/40"></div>
                                    New
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <button className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors gap-1 group">
                        {t.galleryMore} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <button 
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img 
                        src={lightboxImage} 
                        alt="Enlarged view" 
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
};

export default GallerySection;
