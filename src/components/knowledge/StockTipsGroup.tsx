import React, { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
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
    // const { t } = useTranslation();
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
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 w-full">
            <div className="mb-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tips</h4>
            </div>

            <div className="relative group w-full">
                <div className="rounded-xl border border-slate-100 overflow-hidden bg-slate-50">
                    <img
                        src={TIPS_IMAGES[currentIndex]}
                        alt={`Stock Tip ${currentIndex + 1}`}
                        className="w-full h-auto object-contain block transition-opacity duration-300"
                    />
                </div>

                {showArrows && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </>
                )}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-black/20 backdrop-blur-[2px]">
                    {TIPS_IMAGES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={clsx(
                                "w-1.5 h-1.5 rounded-full transition-all cursor-pointer",
                                index === currentIndex
                                    ? 'bg-white'
                                    : 'bg-white/40 hover:bg-white/60'
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StockTipsGroup;
