import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
    heroTag: string;
    heroTitlePrefix: string;
    heroTitleSuffix: string;
    heroSubtitleZh: string;
    heroSubtitleEn: string;
    heroDesc: string;
    heroButton: string;
    
    posterTitle: string;
    posterSubtitle: string;
    poster2024Date: string;
    poster2025Date: string;
    poster2025Highlight: string;
    
    statsTitle: string;
    statsSubtitle: string;
    statLabel2024: string;
    statDesc2024: string;
    statLabel2025: string;
    statDesc2025: string;
    statLabelImpact: string;
    statDescImpact: string;
    statLabelFeedback: string;
    statDescFeedback: string;

    dataTitle: string;
    dataSubtitle: string;
    dataInsightTitle: string;
    dataSource: string;
    data2024Insight: string;
    data2025Insight: string;
    
    filmTitle: string;
    filmSubtitle: string;
    filmRachelDesc: string;
    filmUkraineDesc: string;
    filmProducer: string;
    filmOfficialSite: string;

    feedbackTitle: string;
    feedbackSubtitle: string;
    feedbackWordCloud: string;
    feedbackCount: string;

    galleryTitle: string;
    gallerySubtitle: string;
    galleryMore: string;

    footerTeam: string;
    footerDesc: string;
    footerPrivacy: string;
    footerContact: string;
}

const translations: Record<Language, Translations> = {
    zh: {
        heroTag: "Chi Mei Medical Center",
        heroTitlePrefix: "奇美",
        heroTitleSuffix: "友善醫療嘉年華",
        heroSubtitleZh: "跨越兩年的友善醫療旅程",
        heroSubtitleEn: "The 2024-2025 Journey",
        heroDesc: "從 106 到 275 人的共鳴，我們致力於推廣友善醫療與人文關懷。這是一場結合教育、遊戲與電影的年度盛會，讓醫療更有溫度。",
        heroButton: "回顧我們的足跡",

        posterTitle: "歷屆活動主視覺",
        posterSubtitle: "VISUAL CHRONICLE 2024-2025",
        poster2024Date: "2024 年 12 月",
        poster2025Date: "2025 年 12 月",
        poster2025Highlight: "成效顯著・人數倍增",

        statsTitle: "年度成長對比",
        statsSubtitle: "Year-over-Year Growth",
        statLabel2024: "2024 (第一屆)",
        statDesc2024: "第一屆參與人數",
        statLabel2025: "2025 (本屆)",
        statDesc2025: "本屆參與人數",
        statLabelImpact: "影響力",
        statDescImpact: "後測回收增長",
        statLabelFeedback: "回饋",
        statDescFeedback: "正面回饋數",

        dataTitle: "知能成效分析",
        dataSubtitle: "Learning Outcome Analysis",
        dataInsightTitle: "年度觀察",
        dataSource: "* 資料來源：各年度前後測問卷統計",
        data2024Insight: "2024年共106人參與，U=U概念理解從前測78.9%提升至後測93.5%，顯示活動有效澄清對HIV傳染風險的迷思。",
        data2025Insight: "2025年參與人數大幅增加(275人)，且U=U與照護觀念的後測正確率仍維持在93%以上的高水準，顯示大規模活動仍能維持高品質的教育成效。",

        filmTitle: "歷屆影展回顧",
        filmSubtitle: "Cinematic Journey of Empathy",
        filmRachelDesc: "2024年首屆友善醫療日放映作品，以感人的故事探討HIV與人性關懷的主題。本片透過主角瑞秋的視角，帶領觀眾深入理解感染者的生活處境與醫療照護的重要性。",
        filmUkraineDesc: "本片追隨 24 歲的烏克蘭 HIV 行動者 Yana Panfilova，在戰爭流離後於柏林持續領導青年組織 Teenergizer。她與夥伴受訓後重返烏克蘭，以影像揭露戰時下獨特的公共衛生危機。",
        filmProducer: "執行製片：Richard Gere",
        filmOfficialSite: "官方網站",

        feedbackTitle: "回饋與迴響",
        feedbackSubtitle: "Voices from Participants",
        feedbackWordCloud: "2025 關鍵字雲",
        feedbackCount: "275 則回饋 (275 Feedbacks)",

        galleryTitle: "活動花絮",
        gallerySubtitle: "Highlights & Memories",
        galleryMore: "查看更多相片",

        footerTeam: "奇美友愛 HIV 照護團隊",
        footerDesc: "我們提供整合式、友善且尊重多元的 HIV 照護服務，涵蓋醫療、心理、社會支持與社群連結。",
        footerPrivacy: "隱私權政策",
        footerContact: "聯絡我們"
    },
    en: {
        heroTag: "Chi Mei Medical Center",
        heroTitlePrefix: "Chi Mei",
        heroTitleSuffix: "Friendly Medical Carnival",
        heroSubtitleZh: "A Friendly Medical Journey",
        heroSubtitleEn: "Bridging Care & Humanity",
        heroDesc: "From 106 to 275 participants. We are dedicated to promoting friendly medical care and human compassion. An annual carnival combining education, games, and cinema.",
        heroButton: "Explore Our Journey",

        posterTitle: "Visual Chronicle",
        posterSubtitle: "2024-2025 Event Posters",
        poster2024Date: "Dec 2024",
        poster2025Date: "Dec 2025",
        poster2025Highlight: "Significant Growth",

        statsTitle: "Growth Comparison",
        statsSubtitle: "Year-over-Year Statistics",
        statLabel2024: "2024 (1st Year)",
        statDesc2024: "Participants",
        statLabel2025: "2025 (Current)",
        statDesc2025: "Participants",
        statLabelImpact: "Impact",
        statDescImpact: "Post-test Growth",
        statLabelFeedback: "Feedback",
        statDescFeedback: "Positive Responses",

        dataTitle: "Outcome Analysis",
        dataSubtitle: "Learning Outcome Data",
        dataInsightTitle: "Yearly Insight",
        dataSource: "* Source: Pre/Post-test Questionnaires",
        data2024Insight: "In 2024, with 106 participants, U=U concept understanding rose from 78.9% to 93.5%, effectively clarifying myths about HIV transmission risks.",
        data2025Insight: "In 2025, participants more than doubled (275). Despite the scale, post-test accuracy for U=U and care concepts remained above 93%, demonstrating high-quality educational impact.",

        filmTitle: "Film Retrospective",
        filmSubtitle: "Cinematic Journey of Empathy",
        filmRachelDesc: "Screened at the inaugural 2024 Friendly Medical Day, this touching story explores HIV and human compassion. Through Rachel's perspective, viewers gain insight into the lives of those living with HIV.",
        filmUkraineDesc: "Following 24-year-old Ukrainian HIV activist Yana Panfilova. After displacement to Berlin, she leads 'Teenergizer' and returns to Ukraine to document unique public health crises during wartime.",
        filmProducer: "Exec Producer: Richard Gere",
        filmOfficialSite: "Official Site",

        feedbackTitle: "Feedback",
        feedbackSubtitle: "Voices from Participants",
        feedbackWordCloud: "2025 Word Cloud",
        feedbackCount: "275 Feedbacks",

        galleryTitle: "Gallery",
        gallerySubtitle: "Highlights & Memories",
        galleryMore: "View More Photos",

        footerTeam: "Chi Mei HIV Care Team",
        footerDesc: "We provide integrated, friendly, and diverse HIV care services, covering medical, psychological, social support, and community connection.",
        footerPrivacy: "Privacy Policy",
        footerContact: "Contact Us"
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('zh');

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};