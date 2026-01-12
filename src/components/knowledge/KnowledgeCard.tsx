import React from 'react';
import { useTranslation } from 'react-i18next';
import { StockKnowledge } from '../../types/knowledge';

interface KnowledgeCardProps {
    data: StockKnowledge;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ data }) => {
    const { t } = useTranslation();
    const { ChartComponent } = data;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {t(`knowledge.${data.titleKey}.title`)}
                </h3>
            </div>
            <div className="flex-1 p-6 relative">
                <div className="mb-4">
                    <ChartComponent />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {t(`knowledge.${data.titleKey}.desc`)}
                </p>
            </div>
        </div>
    );
};

export default KnowledgeCard;
