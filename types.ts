export interface ChartDataPoint {
    subject: string;
    A: number; // Pre-test
    B: number; // Post-test
    fullMark: number;
}

export interface YearData {
    year: string;
    participants: number;
    insight: string;
    data: ChartDataPoint[];
}

export interface Film {
    year: string;
    title: string;
    director?: string;
    duration?: string;
    type: string;
    description: string;
    credits?: string;
    link?: string;
    posterColor?: string;
    posterImage?: string;
}

export interface Feedback {
    id: number;
    text: string;
    author?: string;
}

export interface GalleryItem {
    id: number;
    year: string;
    src: string;
    alt: string;
    isPlaceholder?: boolean;
}