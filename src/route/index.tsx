import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import Layout from '../components/Layout';
import StockAnalysis from '../pages/StockAnalysis';
import AnalysisInProgress from '../pages/AnalysisInProgress';
import PremiumDashboard from '../pages/PremiumDashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: 'analysis',
                element: <StockAnalysis />,
            },
            {
                path: 'analysis-in',
                element: <AnalysisInProgress />,
            },
            {
                path: 'dashboard',
                element: <PremiumDashboard />,
            },
        ],
    },
]);
