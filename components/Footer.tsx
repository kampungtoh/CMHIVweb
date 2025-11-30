import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-neutral-900 text-white py-16">
            <div className="container mx-auto px-6 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-neutral-800 rounded-full mb-8 relative group">
                    <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <Heart className="w-6 h-6 text-secondary animate-pulse relative z-10" fill="#e0c23a" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{t.footerTeam}</h3>
                <p className="text-neutral-400 mb-8 max-w-lg mx-auto leading-relaxed">
                    {t.footerDesc}
                </p>
                
                <a 
                    href="mailto:aids@mail.chimei.org.tw" 
                    className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-full text-secondary transition-colors duration-300 mb-12"
                >
                    <Mail className="w-5 h-5" />
                    aids@mail.chimei.org.tw
                </a>
                
                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 gap-4">
                    <p>© 2025 Chi Mei Medical Center. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors">{t.footerPrivacy}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{t.footerContact}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
