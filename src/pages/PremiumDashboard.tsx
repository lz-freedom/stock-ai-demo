import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appStockBaseQuotaUsingGet, appStockRelatedInfoUsingGet, appStockHistoryDataUsingGet, appStockFinancialsDataUsingGet } from '@/api/app/gupiao';
import { AppStockBaseQuotaUsingGetResponse, AppStockRelatedInfoUsingGetResponse, CommonStockBaseDataResStockHistoryItem, CommonStockBaseDataResStockFinancialsItem } from '@/api/app/types';
import { generateFinancialLogs, generatePeerComparisonLogs, generateStockInfoLogs } from '@/utils/financialAnalysis';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

import StockTipsGroup from '@/components/knowledge/StockTipsGroup';

import IconOpenAI from '@/assets/ai-model/openai.svg';
import IconClaude from '@/assets/ai-model/claude-color.svg';
import IconGrok from '@/assets/ai-model/grok.svg';
import IconDeepSeek from '@/assets/ai-model/deepseek-color.svg';
import IconGoogle from '@/assets/ai-model/google.svg';
import IconMinimax from '@/assets/ai-model/minimax-color.svg';
import IconDoubao from '@/assets/ai-model/doubao-color.svg';
import IconQwen from '@/assets/ai-model/qwen-color.svg';
const PremiumDashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('1Y');
    const [searchParams] = useSearchParams();
    const stockSymbol = searchParams.get('stock_symbol') || 'AAPL';
    const exchangeAcronym = searchParams.get('exchange_acronym') || 'NASDAQ';
    const [stockData, setStockData] = useState<AppStockBaseQuotaUsingGetResponse['data'] | null>(null);
    const [relatedData, setRelatedData] = useState<AppStockRelatedInfoUsingGetResponse['data'] | null>(null);
    const [financialData, setFinancialData] = useState<{
        income?: CommonStockBaseDataResStockFinancialsItem;
        balance?: CommonStockBaseDataResStockFinancialsItem;
        cashflow?: CommonStockBaseDataResStockFinancialsItem;
    }>({});
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const [stockInfoLogs, setStockInfoLogs] = useState<string[]>([]);
    const [peerLogs, setPeerLogs] = useState<string[]>([]);
    const [financialLogs, setFinancialLogs] = useState<string[]>([]);
    const [fullLogs, setFullLogs] = useState<string[]>([]);

    // Combine logs
    useEffect(() => {
        setFullLogs([...stockInfoLogs, ...financialLogs, ...peerLogs]);
    }, [stockInfoLogs, financialLogs, peerLogs]);

    // Reset logs on symbol change
    useEffect(() => {
        setStockInfoLogs([]);
        setPeerLogs([]);
        setFinancialLogs([]);
        setTerminalLogs([]);
    }, [stockSymbol]);
    const [historyData, setHistoryData] = useState<CommonStockBaseDataResStockHistoryItem[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [progress, setProgress] = useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const uniquePeers = React.useMemo(() => {
        const mergedPeers = [
            ...(relatedData?.compare_to_stock_list || []),
            ...(relatedData?.people_also_watch_stock_list || [])
        ];
        return Array.from(new Map(mergedPeers.map(item => [item.symbol, item])).values());
    }, [relatedData]);

    useEffect(() => {
        const duration = 8 * 60 * 1000; // 8 minutes
        const startTime = Date.now();

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const ratio = Math.min(elapsed / duration, 1);

            // Cubic ease-out function: 1 - (1 - t)^3
            // This starts fast and slows down towards the end
            const easedProgress = (1 - Math.pow(1 - ratio, 3)) * 100;

            setProgress(easedProgress);

            if (ratio >= 1) {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch base quota
                const res = await appStockBaseQuotaUsingGet({
                    params: {
                        symbol: stockSymbol,
                        exchange_acronym: exchangeAcronym,
                    }
                });
                if (res) {
                    setStockData(res as any);
                    if (res.data) setStockInfoLogs(generateStockInfoLogs(res.data));
                }

                // Fetch related info (peers)
                const relatedRes = await appStockRelatedInfoUsingGet({
                    params: {
                        symbol: stockSymbol,
                        exchange_acronym: exchangeAcronym,
                    }
                });
                if (relatedRes) {
                    setRelatedData(relatedRes as any);
                    // We need stockData here. Since we just fetched it above (res), we can use res.data
                    if (res && res.data && relatedRes.data) {
                        setPeerLogs(generatePeerComparisonLogs(res.data, relatedRes.data));
                    }
                }

                // Fetch Financials
                try {
                    const [incomeRes, balanceRes, cashflowRes] = await Promise.all([
                        appStockFinancialsDataUsingGet({ params: { symbol: stockSymbol, exchange_acronym: exchangeAcronym, financials_type: 'income', freq_type: 'quarterly' } }),
                        appStockFinancialsDataUsingGet({ params: { symbol: stockSymbol, exchange_acronym: exchangeAcronym, financials_type: 'balance', freq_type: 'quarterly' } }),
                        appStockFinancialsDataUsingGet({ params: { symbol: stockSymbol, exchange_acronym: exchangeAcronym, financials_type: 'cashflow', freq_type: 'quarterly' } })
                    ]);

                    const incomeItem = (incomeRes as any)?.list?.[0] || incomeRes.data?.list?.[0];
                    const balanceItem = (balanceRes as any)?.list?.[0] || balanceRes.data?.list?.[0];
                    const cashflowItem = (cashflowRes as any)?.list?.[0] || cashflowRes.data?.list?.[0];

                    setFinancialData({
                        income: incomeItem,
                        balance: balanceItem,
                        cashflow: cashflowItem
                    });

                    const logs = generateFinancialLogs(incomeItem, balanceItem, cashflowItem);
                    setFinancialLogs(logs);
                } catch (e) {
                    console.error('Failed to fetch financials', e);
                    setTerminalLogs(["Error: Financial data stream interrupted."]);
                }

            } catch (error) {
                console.error('Failed to fetch stock data', error);
            }
        };
        fetchData();
    }, [stockSymbol, exchangeAcronym]);

    // Log Simulation Effect
    // Log Simulation Effect (Incremental)
    useEffect(() => {
        if (terminalLogs.length < fullLogs.length) {
            const timeout = setTimeout(() => {
                setTerminalLogs(prev => [...prev, fullLogs[prev.length]]);

                // Auto-scroll
                const terminal = document.querySelector('.terminal-scroll-area');
                if (terminal) {
                    terminal.scrollTop = terminal.scrollHeight;
                }
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [terminalLogs, fullLogs]);

    const PERIOD_MAPPING: Record<string, { period: string; interval: string }> = {
        '1D': { period: '1d', interval: '5m' },
        '5D': { period: '5d', interval: '15m' },
        '1M': { period: '1mo', interval: '1d' },
        '6M': { period: '6mo', interval: '1d' },
        'YTD': { period: 'ytd', interval: '1d' },
        '1Y': { period: '1y', interval: '1d' },
        '5Y': { period: '5y', interval: '1wk' },
        'All': { period: 'max', interval: '1mo' },
    };

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoadingHistory(true);
            try {
                const { period, interval } = PERIOD_MAPPING[selectedPeriod] || PERIOD_MAPPING['5Y'];
                const res = await appStockHistoryDataUsingGet({
                    params: {
                        symbol: stockSymbol,
                        exchange_acronym: exchangeAcronym,
                        period,
                        interval,
                    }
                });
                // The response structure seems to be unwrapped to the data object directly by the request interceptor
                // based on how stockData and relatedData are handled.
                // So 'res' is effectively AppStockHistoryDataUsingGetResponse.data
                const data = res as any;
                if (data?.list) {
                    setHistoryData(data.list);
                } else if (res?.data?.list) {
                    // Fallback in case I am wrong and it IS wrapped
                    setHistoryData(res.data.list);
                }
            } catch (error) {
                console.error('Failed to fetch history data', error);
            } finally {
                setIsLoadingHistory(false);
            }
        };
        fetchHistory();
    }, [selectedPeriod, stockSymbol, exchangeAcronym]);

    const getChartOption = () => {
        if (!historyData || historyData.length === 0) return {};

        const dates = historyData.map(item => item.date || item.date_raw);
        const prices = historyData.map(item => item.close);

        return {
            tooltip: {
                trigger: 'axis',
                formatter: function (params: any) {
                    const param = params[0];
                    if (!param) return '';
                    const date = historyData[param.dataIndex].date || historyData[param.dataIndex].date_raw;
                    const price = param.value;
                    return `<div><div style="font-size:10px;color:#666;">${date}</div><div style="font-weight:bold;color:#3b82f6;">${Number(price).toFixed(2)}</div></div>`;
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: [8, 12],
                textStyle: {
                    color: '#1e293b'
                }
            },
            grid: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 0,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: false,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: (value: string) => {
                        // Simple logic to show shorter date based on period could be added here
                        const date = new Date(value);
                        if (selectedPeriod === '1D' || selectedPeriod === '5D') {
                            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }
                        return date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' });
                    },
                    color: '#94a3b8',
                    fontSize: 10,
                    showMinLabel: true,
                    showMaxLabel: true,
                }
            },
            yAxis: {
                type: 'value',
                scale: true,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f1f5f9',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    show: false // Hide Y axis labels to match design or keep simple
                }
            },
            series: [{
                data: prices,
                type: 'line',
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    color: '#3b82f6',
                    width: 2
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(59, 130, 246, 0.2)' },
                        { offset: 1, color: 'rgba(59, 130, 246, 0)' }
                    ])
                }
            }]
        };
    };

    return (

        <div className="font-display text-slate-800 flex flex-col md:flex-row border-t border-slate-200">
            <main className="flex-1 relative">
                <div className="max-w-[1100px] mx-auto p-6 flex flex-col gap-8">
                    {/* Marquee Section */}
                    {stockData && (
                        <div className="w-full border border-slate-200 rounded-xl h-9 flex items-center overflow-hidden relative shadow-sm shrink-0">
                            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap px-4">
                                {[0, 1].map((iteration) => (
                                    <React.Fragment key={iteration}>
                                        {[
                                            { label: 'Price', value: stockData.current_price },
                                            { label: 'Change', value: stockData.change_amount, color: true },
                                            { label: 'Change %', value: stockData.change_percent, isPercent: true, color: true },
                                            { label: 'Market', value: stockData.market_state },
                                            { label: 'Time', value: stockData.regular_market_time, isDate: true },
                                            { label: 'Pre Price', value: stockData.pre_market_price },
                                            { label: 'Pre Chg', value: stockData.pre_market_change, color: true },
                                            { label: 'Pre %', value: stockData.pre_market_change_percent, isPercent: true, color: true },
                                            { label: 'Pre Time', value: stockData.pre_market_time, isDate: true },
                                            { label: 'Post Price', value: stockData.post_market_price },
                                            { label: 'Post Chg', value: stockData.post_market_change, color: true },
                                            { label: 'Post %', value: stockData.post_market_percent, isPercent: true, color: true },
                                            { label: 'Post Time', value: stockData.post_market_time, isDate: true },
                                            { label: 'Open', value: stockData.open },
                                            { label: 'Prev Close', value: stockData.previous_close },
                                            { label: 'Day High', value: stockData.day_high },
                                            { label: 'Day Low', value: stockData.day_low },
                                            { label: 'Avg Price', value: stockData.average_price },
                                            { label: 'Amplitude', value: stockData.amplitude },
                                            { label: 'Volume', value: stockData.volume },
                                            { label: 'Turnover', value: stockData.turnover },
                                            { label: 'Turnover Rate', value: stockData.turnover_rate, isPercent: true },
                                            { label: 'Vol Ratio', value: stockData.volume_ratio },
                                            { label: 'Bid/Ask', value: stockData.bid_ask_ratio },
                                            { label: 'Mkt Cap', value: stockData.market_cap },
                                            { label: 'Float Cap', value: stockData.float_market_cap },
                                            { label: 'Shares Out', value: stockData.shares_outstanding },
                                            { label: 'Float Shares', value: stockData.float_shares },
                                            { label: 'Implied Shares', value: stockData.implied_shares_outstanding },
                                            { label: '52W High', value: stockData.fifty_two_week_high },
                                            { label: '52W Low', value: stockData.fifty_two_week_low },
                                            { label: '52W Range', value: stockData.fifty_two_week_range },
                                            { label: 'All Time High', value: stockData.all_time_high },
                                            { label: 'All Time Low', value: stockData.all_time_low },
                                            { label: 'PE (TTM)', value: stockData.pe_ttm },
                                            { label: 'PE (Static)', value: stockData.pe_static },
                                            { label: 'PE (Fwd)', value: stockData.pe_forward },
                                            { label: 'PB', value: stockData.pb_ratio },
                                            { label: 'EPS (TTM)', value: stockData.eps_ttm },
                                            { label: 'EPS (Fwd)', value: stockData.eps_forward },
                                            { label: 'Book Value', value: stockData.book_value },
                                            { label: 'Div Rate', value: stockData.dividend_rate },
                                            { label: 'Div Yield', value: stockData.dividend_yield, isPercent: true },
                                            { label: 'Split Factor', value: stockData.last_split_factor },
                                            { label: 'Split Date', value: stockData.last_split_date, isDate: true },
                                            { label: 'Beta', value: stockData.beta },
                                            { label: '50D Avg', value: stockData.fifty_day_average },
                                            { label: '200D Avg', value: stockData.two_hundred_day_average },
                                            { label: '50D Chg', value: stockData.fifty_day_average_change, color: true },
                                            { label: '50D %', value: stockData.fifty_day_average_change_percent, isPercent: true, color: true },
                                            { label: '200D Chg', value: stockData.two_hundred_day_average_change, color: true },
                                            { label: '200D %', value: stockData.two_hundred_day_average_change_percent, isPercent: true, color: true },
                                            { label: 'YTD', value: stockData.year_to_date_return, isPercent: true, color: true },
                                            { label: '3M', value: stockData.three_month_return, isPercent: true, color: true },
                                            { label: '6M', value: stockData.six_month_return, isPercent: true, color: true },
                                            { label: '1Y', value: stockData.one_year_return, isPercent: true, color: true },
                                            { label: '3Y', value: stockData.three_year_return, isPercent: true, color: true },
                                            { label: '5Y', value: stockData.five_year_return, isPercent: true, color: true },
                                            { label: '52W %', value: stockData.fifty_two_week_change_percent, isPercent: true, color: true },
                                            { label: 'S&P 52W %', value: stockData.sand_p_52_week_change, isPercent: true, color: true },
                                            { label: 'Rev/Share', value: stockData.revenue_per_share },
                                            { label: 'Rev Growth', value: stockData.revenue_growth, isPercent: true, color: true },
                                            { label: 'Net Income', value: stockData.net_income_to_common },
                                            { label: 'Earn Growth', value: stockData.earnings_growth, isPercent: true, color: true },
                                            { label: 'Qtr Earn Growth', value: stockData.earnings_quarterly_growth, isPercent: true, color: true },
                                            { label: 'EBITDA', value: stockData.ebitda },
                                            { label: 'EV/Rev', value: stockData.enterprise_to_revenue },
                                            { label: 'EV/EBITDA', value: stockData.enterprise_to_ebitda },
                                            { label: 'ROA', value: stockData.return_on_assets, isPercent: true, color: true },
                                            { label: 'ROE', value: stockData.return_on_equity, isPercent: true, color: true },
                                            { label: 'Free Cash', value: stockData.free_cashflow },
                                            { label: 'Op Cash', value: stockData.operating_cashflow },
                                            { label: 'Total Cash', value: stockData.total_cash },
                                            { label: 'Cash/Share', value: stockData.total_cash_per_share },
                                            { label: 'Total Debt', value: stockData.total_debt },
                                            { label: 'Debt/Eq', value: stockData.debt_to_equity },
                                            { label: 'Profit Mgn', value: stockData.profit_margin, isPercent: true, color: true },
                                            { label: 'Gross Mgn', value: stockData.gross_margin, isPercent: true, color: true },
                                            { label: 'EBITDA Mgn', value: stockData.ebitda_margin, isPercent: true, color: true },
                                            { label: 'Op Mgn', value: stockData.operating_margin, isPercent: true, color: true },
                                            { label: 'Trailing EPS', value: stockData.trailing_eps },
                                            { label: 'Insider %', value: stockData.held_percent_insiders, isPercent: true },
                                            { label: 'Inst %', value: stockData.held_percent_institutions, isPercent: true },
                                            { label: 'Short', value: stockData.shares_short },
                                            { label: 'Prev Short', value: stockData.shares_short_prior_month },
                                            { label: 'Prev Short Date', value: stockData.shares_short_previous_month_date, isDate: true },
                                            { label: 'Short Date', value: stockData.date_short_interest, isDate: true },
                                            { label: 'Short % Out', value: stockData.shares_percent_shares_out, isPercent: true },
                                            { label: 'Short Ratio', value: stockData.short_ratio },
                                            { label: 'Short % Float', value: stockData.short_percent_of_float, isPercent: true },
                                        ].map((item, index) => item.value !== undefined && item.value !== null ? (
                                            <div key={`${iteration}-${index}`} className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{item.label}</span>
                                                <span className={`text-xs font-bold whitespace-nowrap ${item.color && typeof item.value === 'number' ? (item.value >= 0 ? 'text-emerald-600' : 'text-rose-600') : 'text-slate-700'}`}>
                                                    {item.isDate ? new Date(Number(item.value) * 1000).toLocaleDateString() :
                                                        item.isPercent ? (Number(item.value) * 100).toFixed(2) + '%' :
                                                            typeof item.value === 'number' && item.value > 1000000 ? (item.value > 1000000000 ? (item.value / 1000000000).toFixed(2) + 'B' : (item.value / 1000000).toFixed(2) + 'M') :
                                                                typeof item.value === 'number' ? Number(item.value).toLocaleString(undefined, { maximumFractionDigits: 2 }) : item.value}
                                                </span>
                                                <div className="w-px h-3 bg-slate-200 ml-4 last:hidden"></div>
                                            </div>
                                        ) : null)}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Title Section */}
                    {stockData && (
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-2">
                            {/* Left: Logo & Info */}
                            <div className="flex items-center gap-6">
                                <div className="size-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
                                    {stockData.svg_logo_url ? (
                                        <img src={stockData.svg_logo_url} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-slate-400">{stockData.symbol?.[0]}</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl font-extrabold text-slate-900">{stockData.name}</h1>
                                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${stockData.market_state === 'REG' || stockData.market_state === 'REGULAR'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : stockData.market_state === 'PRE'
                                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                : 'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            {stockData.market_state || 'MARKET'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium h-5">
                                        <span className="font-bold text-slate-700">{stockData.symbol}</span>
                                        <div className="w-px h-3 bg-slate-300"></div>
                                        {stockData.exchange_svg_logo_url && <img src={stockData.exchange_svg_logo_url} className="h-3 w-auto opacity-80" alt="" />}
                                        <span>{stockData.exchange_acronym}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium h-5">
                                        {stockData.country_region_svg_logo_url && <img src={stockData.country_region_svg_logo_url} className="h-3 w-auto opacity-80" alt="" />}
                                        <span>{stockData.country_region_code}</span>
                                        <div className="w-px h-3 bg-slate-300"></div>
                                        <span>{stockData.currency}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Price & Time */}
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tight">
                                        {stockData.current_price?.toFixed(2)}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-2 font-bold text-lg ${stockData.change_percent && stockData.change_percent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    <span>{stockData.change_amount && stockData.change_amount > 0 ? '+' : ''}{stockData.change_amount?.toFixed(2)}</span>
                                    <span>({stockData.change_percent ? (stockData.change_percent * 100).toFixed(2) + '%' : '0.00%'})</span>
                                </div>
                                <div className="text-xs text-slate-400 font-medium mt-1">
                                    {stockData.exchange_timezone_short_name} • {stockData.regular_market_time ? new Date(stockData.regular_market_time * 1000).toLocaleString() : '-'}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Fundamentals Grid */}
                    <div className="p-5 border border-slate-200 rounded-2xl ">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Fundamentals</h4>
                        <div className="flex items-center justify-between divide-x divide-slate-200 overflow-x-auto scrollbar-hide py-1">
                            {[
                                { label: 'Market Cap', value: stockData?.market_cap ? (stockData.market_cap / 1e9).toFixed(2) + 'B' : '-' },
                                { label: 'P/E (TTM)', value: stockData?.pe_ttm?.toFixed(2) },
                                { label: 'P/B', value: stockData?.pb_ratio?.toFixed(2) },
                                { label: 'Dividend (Yield)', value: stockData?.dividend_yield ? (stockData.dividend_yield * 100).toFixed(2) + '%' : '-' },
                                { label: 'Volume', value: stockData?.volume ? (stockData.volume / 1e6).toFixed(2) + 'M' : '-' },
                                { label: '52wk Range', value: stockData?.fifty_two_week_range || (stockData?.fifty_two_week_low && stockData?.fifty_two_week_high ? `${stockData.fifty_two_week_low} - ${stockData.fifty_two_week_high}` : '-') },
                                { label: 'Beta', value: stockData?.beta?.toFixed(2) },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col gap-1 px-6 first:pl-0 last:pr-0 text-left flex-1 shrink-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{item.label}</span>
                                    <span className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">{item.value || '-'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Returns Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: 'YTD Return', value: stockData?.year_to_date_return },
                            { label: '3M Return', value: stockData?.three_month_return },
                            { label: '6M Return', value: stockData?.six_month_return },
                            { label: '1Y Return', value: stockData?.one_year_return },
                            { label: '3Y Return', value: stockData?.three_year_return },
                            { label: '5Y Return', value: stockData?.five_year_return },
                        ].map((item) => (
                            <div key={item.label} className="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{item.label}</span>
                                <span className={`text-lg font-bold ${item.value && item.value >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {item.value ? (item.value > 0 ? '+' : '') + (item.value * 100).toFixed(1) + '%' : '-'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Main Chart */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                            <h3 className="text-slate-800 font-bold text-lg">Price Action</h3>
                            <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200/60 overflow-x-auto">
                                {['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'All'].map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setSelectedPeriod(period)}
                                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${selectedPeriod === period
                                            ? 'text-primary bg-white shadow-sm ring-1 ring-slate-200/50'
                                            : 'text-slate-500 hover:text-slate-900'
                                            }`}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="relative flex-1 px-8 py-4 flex flex-col justify-end">
                            <div className="w-full h-[255px]">
                                {isLoadingHistory ? (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Loading...</div>
                                ) : (
                                    <ReactECharts
                                        option={getChartOption()}
                                        style={{ height: '100%', width: '100%' }}
                                        notMerge={true}
                                    />
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Peer Comparison Section */}
                    {uniquePeers.length > 0 && (
                        <div className="flex flex-col gap-4 mb-2">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-slate-800 font-bold text-lg">Peer Comparison</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => scroll('left')}
                                        className="size-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors bg-white shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={() => scroll('right')}
                                        className="size-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors bg-white shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                            <div
                                ref={scrollRef}
                                className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1 scroll-smooth"
                            >
                                {uniquePeers.map((peer) => (
                                    <StockCard key={peer.id || peer.symbol} peer={peer} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="flex justify-center">
                        <p className="text-[10px] leading-relaxed text-slate-400 text-center">
                            PolyBull的超级AI的回答未必正确无误，请注意核查，不构成投资或交易建议；任何决策与风险由用户自行承担。
                        </p>
                    </div>
                </div>
            </main>

            {/* Sidebar */}
            <aside className="w-[520px] shrink-0 bg-slate-50 border-l border-slate-200 flex flex-col">
                <div className="flex flex-col gap-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-2xl h-14 relative flex items-center overflow-hidden shadow-sm shrink-0 border border-slate-200">
                        <div className="h-full bg-blue-600 progress-stripes transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-slate-900 font-bold text-lg drop-shadow-sm">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="absolute inset-0 flex items-center px-6 pointer-events-none">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] drop-shadow-sm">Report Engine</span>
                                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Compiling Data</span>
                            </div>
                        </div>
                    </div>


                    {/* Unified Analysis Section */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col shrink-0 overflow-hidden h-[500px]">
                        {/* Analysis Header */}
                        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[18px] text-slate-400">terminal</span>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">PolyBull的超级AI正在思考</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </div>
                        </div>

                        {/* Models Section */}
                        <div className="relative p-5 border-b border-slate-100">
                            {/* Connection Overlay */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.1" />
                                        <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>
                                {/* Curved Connections */}
                                <path d="M40,20 Q90,5 140,20" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                                <path d="M140,20 Q190,35 240,20" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                                <path d="M240,20 Q290,5 340,20" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />

                                <path d="M40,70 Q90,85 140,70" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                                <path d="M140,70 Q190,55 240,70" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                                <path d="M240,70 Q290,85 340,70" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />

                                <path d="M40,20 Q90,45 140,70" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                                <path d="M140,20 L240,70" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                                <path d="M340,20 Q290,45 240,70" stroke="url(#line-gradient)" strokeWidth="1" fill="none" strokeDasharray="3 3" />

                                {/* Moving Particles */}
                                <circle r="2" fill="#3b82f6" className="opacity-0">
                                    <animateMotion dur="3s" repeatCount="indefinite" path="M40,20 Q90,5 140,20" begin="0s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                        <mpath />
                                    </animateMotion>
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle r="2" fill="#8b5cf6" className="opacity-0">
                                    <animateMotion dur="4s" repeatCount="indefinite" path="M340,20 Q290,45 240,70" begin="1s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                        <mpath />
                                    </animateMotion>
                                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                                </circle>
                                <circle r="2" fill="#10b981" className="opacity-0">
                                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M40,70 Q90,85 140,70" begin="0.5s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                        <mpath />
                                    </animateMotion>
                                    <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                                </circle>
                                <circle r="2" fill="#f59e0b" className="opacity-0">
                                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M140,20 Q190,35 240,20" begin="1.5s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                        <mpath />
                                    </animateMotion>
                                    <animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite" />
                                </circle>
                            </svg>

                            <div className="grid grid-cols-4 gap-y-6 gap-x-3 relative z-10">
                                {[
                                    { icon: IconOpenAI, color: 'text-emerald-500', name: 'OpenAI' },
                                    { icon: IconClaude, color: 'text-orange-500', name: 'Claude' },
                                    { icon: IconGrok, color: 'text-slate-800', name: 'Grok' },
                                    { icon: IconDeepSeek, color: 'text-blue-500', name: 'DeepSeek' },
                                    { icon: IconGoogle, color: 'text-red-500', name: 'Google' },
                                    { icon: IconMinimax, color: 'text-indigo-500', name: 'Minimax' },
                                    { icon: IconDoubao, color: 'text-cyan-500', name: 'Doubao' },
                                    { icon: IconQwen, color: 'text-blue-600', name: 'Qwen' },
                                ].map((model, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5 group">
                                        <div className={`relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-${model.color.split('-')[1]}-200 transition-colors`}>
                                            <span className={`processing-ring ${model.color}`} style={{ animationDelay: `${i * 0.1}s` }}></span>
                                            <img alt={`${model.name} Model`} className="w-5 h-5 opacity-90 model-icon object-contain" src={model.icon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>




                        {/* Terminal Content */}
                        <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-500 bg-white scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 terminal-scroll-area">

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                                    <span>Connected to <span className="text-primary font-bold">SecureStream v4.2.1</span></span>
                                </div>

                                {terminalLogs.map((log, index) => (
                                    <div key={index} className="flex gap-2 animate-fade-in">
                                        <span className="text-slate-400 select-none text-[9px] min-w-[50px]">
                                            &gt;
                                        </span>
                                        <span className="break-words">{log}</span>
                                    </div>
                                ))}

                                {terminalLogs.length < fullLogs.length && (
                                    <div className="flex gap-2">
                                        <span className="text-slate-400 select-none">&gt;</span>
                                        <span className="animate-pulse w-2 h-4 bg-slate-800 inline-block align-middle ml-1"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Insight Card */}
                    <StockTipsGroup />
                </div>
            </aside >
        </div >
    );
};

// Helper Component for Stock Cards
const StockCard: React.FC<{ peer: any }> = ({ peer }) => {
    return (
        <div className="min-w-[320px] p-5 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Logo, Name, Symbol */}
            <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                    {peer.svg_logo_url ? (
                        <img src={peer.svg_logo_url} alt={peer.symbol} className="w-full h-full object-cover" />
                    ) : (
                        <span className="font-bold text-slate-600 text-xs">{peer.symbol}</span>
                    )}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-slate-900 truncate" title={peer.name}>{peer.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                        <span>{peer.symbol}</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{peer.exchange_acronym}</span>
                        <span>{peer.regular_market_time ? new Date(peer.regular_market_time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + (peer.exchange_timezone_short_name || '') : '-'}</span>
                    </div>
                </div>
            </div>

            {/* Price & Change */}
            <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-slate-50">
                <span className="text-2xl font-bold text-slate-900">
                    {peer.current_price?.toFixed(2) || '-'}
                    <span className="text-xs font-normal text-slate-400 ml-1">{peer.currency}</span>
                </span>
                <div className={`flex flex-col items-end ${peer.change_percent && peer.change_percent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <span className="text-sm font-bold flex items-center">
                        {peer.change_percent && peer.change_percent >= 0 ? '+' : ''}
                        {peer.change_percent ? (peer.change_percent).toFixed(2) + '%' : '-'}
                    </span>
                    <span className="text-[10px] font-medium opacity-80">
                        {peer.change_amount && peer.change_amount > 0 ? '+' : ''}
                        {peer.change_amount?.toFixed(2) || '-'}
                    </span>
                </div>
            </div>

            {/* Market Data Grid */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 pb-4 border-b border-slate-50">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Open</span>
                    <span className="font-semibold text-slate-700">{peer.open?.toFixed(2) || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Prev Close</span>
                    <span className="font-semibold text-slate-700">{peer.previous_close?.toFixed(2) || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Day High</span>
                    <span className="font-semibold text-slate-700">{peer.day_high?.toFixed(2) || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Day Low</span>
                    <span className="font-semibold text-slate-700">{peer.day_low?.toFixed(2) || '-'}</span>
                </div>
            </div>

            {/* Returns Grid */}
            <div className="grid grid-cols-2 gap-2">
                {[
                    { label: 'YTD', value: peer.year_to_date_return },
                    { label: '3M', value: peer.three_month_return },
                    { label: '6M', value: peer.six_month_return },
                    { label: '1Y', value: peer.one_year_return },
                    { label: '3Y', value: peer.three_year_return },
                    { label: '5Y', value: peer.five_year_return },
                ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-500 font-bold text-[10px] uppercase">{item.label}</span>
                        <span className={`font-bold ${item.value && item.value >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {item.value ? (item.value > 0 ? '+' : '') + (item.value * 100).toFixed(1) + '%' : '-'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumDashboard;
