import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const TIPS_IMAGES = [
    '/stock_tips/G-Dbx6fbcAA5zQf.jpeg',
    '/stock_tips/G-Dbxs7aIAARxY4.jpeg',
    '/stock_tips/G-DbyIraYAIYUis.jpeg',
    '/stock_tips/G-DbynHaoAAs0me.jpeg',
    '/stock_tips/G-DbyXVacAA9k_F.jpeg',
];

interface StockTipsGroupProps {
    showArrows?: boolean;
    autoPlay?: boolean;
    interval?: number;
}

const StockTipsGroup: React.FC<StockTipsGroupProps> = ({
    showArrows = false,
    autoPlay = true,
    interval = 3000
}) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % TIPS_IMAGES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + TIPS_IMAGES.length) % TIPS_IMAGES.length);
    }, []);

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            nextSlide();
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, nextSlide]);

    return (
        <div className="w-full py-8 px-4 flex justify-center">
            <div className="max-w-5xl w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    {t('tips.title')}
                </h2>

                <div className="relative group w-fit">
                    <div className="rounded-xl shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                            src={TIPS_IMAGES[currentIndex]}
                            alt={`Stock Tip ${currentIndex + 1}`}
                            className="max-w-full h-auto max-h-[70vh] object-contain block transition-opacity duration-300"
                        />
                    </div>

                    {showArrows && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-200 dark:border-gray-700 cursor-pointer"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-200 dark:border-gray-700 cursor-pointer"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-[2px]">
                        {TIPS_IMAGES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={clsx(
                                    "w-2 h-2 rounded-full transition-all cursor-pointer",
                                    index === currentIndex
                                        ? 'bg-white w-4'
                                        : 'bg-white/50 hover:bg-white/80'
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockTipsGroup;
