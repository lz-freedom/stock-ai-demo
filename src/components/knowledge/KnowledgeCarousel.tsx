import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StockKnowledge } from '../../types/knowledge';
import KnowledgeCard from './KnowledgeCard';
import BullishChart from '../charts/BullishChart';
import BearishChart from '../charts/BearishChart';
import CandlestickChart from '../charts/CandlestickChart';
import VolumeChart from '../charts/VolumeChart';

const KNOWLEDGE_LIST: StockKnowledge[] = [
    { id: '1', titleKey: 'bull', descKey: 'bull', ChartComponent: BullishChart },
    { id: '2', titleKey: 'bear', descKey: 'bear', ChartComponent: BearishChart },
    { id: '3', titleKey: 'kline', descKey: 'kline', ChartComponent: CandlestickChart },
    { id: '4', titleKey: 'volume', descKey: 'volume', ChartComponent: VolumeChart },
];

const KnowledgeCarousel: React.FC = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % KNOWLEDGE_LIST.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + KNOWLEDGE_LIST.length) % KNOWLEDGE_LIST.length);
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                {t('knowledge.sectionTitle')}
            </h2>

            <div className="relative">
                {/* Carousel Content */}
                <div className="overflow-hidden">
                    <div className="w-full">
                        <KnowledgeCard data={KNOWLEDGE_LIST[currentIndex]} />
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-200" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-200" />
                </button>

                {/* Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                    {KNOWLEDGE_LIST.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex
                                    ? 'bg-indigo-600 dark:bg-indigo-400'
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeCarousel;
