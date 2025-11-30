import React from 'react';
import Hero from './components/Hero';
import EventPosters from './components/EventPosters';
import StatsSection from './components/StatsSection';
import DataAnalysis from './components/DataAnalysis';
import FilmSection from './components/FilmSection';
import FeedbackSection from './components/FeedbackSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="absolute top-6 right-6 pointer-events-auto">
             <button 
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="group relative bg-white/90 backdrop-blur-md shadow-lg pl-4 pr-5 py-2.5 rounded-full text-primary font-bold text-sm hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden border border-white/20"
            >
                {/* Shimmer effect for button */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
                
                <Globe className="w-4 h-4" />
                <span>{language === 'zh' ? 'English' : '中文'}</span>
             </button>
        </div>
      </nav>
  );
};

function AppContent() {
  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <Hero />
      <EventPosters />
      <StatsSection />
      <DataAnalysis />
      <FilmSection />
      <FeedbackSection />
      <GallerySection />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
