import React from 'react';
import { Quote, ThumbsUp, Cloud } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FeedbackSection: React.FC = () => {
    const { t, language } = useLanguage();

    const feedbacks = language === 'zh' ? [
        "活動形式多元、活潑、有趣，學到很多以前不知道的知識！",
        "後測題目設計得很好，讓我發現自己以前的迷思。",
        "Very nice event. Informative and touching.",
        "今年比去年更盛大，嘉年華的方式很輕鬆，沒有壓力。",
        "U=U的概念理解讓我對疾病改觀，很棒的活動。",
        "講師說明很清楚，收穫良多！"
    ] : [
        "Diverse, lively, and interesting format. Learned a lot!",
        "The post-test was well designed and helped me realize my misconceptions.",
        "Very nice event. Informative and touching.",
        "Bigger than last year. The carnival style was relaxing and stress-free.",
        "Understanding U=U changed my perspective on the disease.",
        "The instructor explained things very clearly. Learned a lot!"
    ];

    return (
        <section className="py-24 bg-neutral-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">{t.feedbackTitle}</h2>
                    <p className="text-neutral-500 uppercase tracking-wider">{t.feedbackSubtitle}</p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Word Cloud Area */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-neutral-100 text-center flex flex-col items-center justify-center min-h-[400px]">
                        <div className="mb-6">
                            <Cloud className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-neutral-900">{t.feedbackWordCloud}</h3>
                        </div>
                        <div className="w-full h-64 bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 flex items-center justify-center relative overflow-hidden group">
                             <img src="https://picsum.photos/400/300?random=2" alt="Wordcloud Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"/>
                             <span className="relative z-10 font-bold text-neutral-500 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                                Word Cloud
                             </span>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-2 rounded-full">
                            <ThumbsUp className="w-5 h-5" />
                            <span>{t.feedbackCount}</span>
                        </div>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="lg:col-span-3 grid md:grid-cols-2 gap-4">
                        {feedbacks.map((text, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-secondary group hover:-translate-y-1 duration-300">
                                <Quote className="w-6 h-6 text-secondary/40 mb-3 group-hover:text-secondary transition-colors" />
                                <p className="text-neutral-700 italic leading-relaxed">
                                    "{text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedbackSection;