import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import KnowledgeCarousel from './components/knowledge/KnowledgeCarousel';
import StockTipsGroup from './components/knowledge/StockTipsGroup';

function App() {
    const { t } = useTranslation();
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-h-screen">
            <h1 className="text-3xl font-bold underline mb-4 text-indigo-600 dark:text-indigo-400">
                {t('common.welcome')}
            </h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{t('common.description')}</p>

            <div className="my-8">
                <KnowledgeCarousel />
            </div>

            <div className="my-8">
                <StockTipsGroup />
            </div>

            <Outlet />
        </div>
    );
}

export default App;
