import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appStockBaseQuotaUsingGet, appStockRelatedInfoUsingGet } from '@/api/app/gupiao';
import { AppStockBaseQuotaUsingGetResponse, AppStockRelatedInfoUsingGetResponse } from '@/api/app/types';

const PremiumDashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('5Y');
    const [searchParams] = useSearchParams();
    const stockSymbol = searchParams.get('stock_symbol') || 'AAPL';
    const exchangeAcronym = searchParams.get('exchange_acronym') || 'NASDAQ';
    const [stockData, setStockData] = useState<AppStockBaseQuotaUsingGetResponse['data'] | null>(null);
    const [relatedData, setRelatedData] = useState<AppStockRelatedInfoUsingGetResponse['data'] | null>(null);
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
                }
            } catch (error) {
                console.error('Failed to fetch stock data', error);
            }
        };
        fetchData();
    }, [stockSymbol, exchangeAcronym]);

    return (

        <div className="font-display text-slate-800 flex flex-col md:flex-row border-t border-slate-200">
            <main className="flex-1 relative">
                <div className="max-w-[1200px] mx-auto p-8 flex flex-col gap-8">
                    {/* Marquee Section */}
                    {stockData && (
                        <div className="w-full border border-slate-200 rounded-xl h-12 flex items-center overflow-hidden relative shadow-sm shrink-0 bg-white">
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
                                            { label: 'YTD Range', value: stockData.year_to_date_trading_date_range },
                                            { label: '3M', value: stockData.three_month_return, isPercent: true, color: true },
                                            { label: '3M Range', value: stockData.three_month_trading_date_range },
                                            { label: '6M', value: stockData.six_month_return, isPercent: true, color: true },
                                            { label: '6M Range', value: stockData.six_month_trading_date_range },
                                            { label: '1Y', value: stockData.one_year_return, isPercent: true, color: true },
                                            { label: '1Y Range', value: stockData.one_year_trading_date_range },
                                            { label: '3Y', value: stockData.three_year_return, isPercent: true, color: true },
                                            { label: '3Y Range', value: stockData.three_year_trading_date_range },
                                            { label: '5Y', value: stockData.five_year_return, isPercent: true, color: true },
                                            { label: '5Y Range', value: stockData.five_year_trading_date_range },
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
                                <div className="size-20 bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex items-center justify-center">
                                    {stockData.svg_logo_url ? (
                                        <img src={stockData.svg_logo_url} alt="Logo" className="w-full h-full object-contain" />
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
                    <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50/50">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Core Fundamentals</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                            {[
                                { label: 'Market Cap', value: stockData?.market_cap ? (stockData.market_cap / 1e9).toFixed(2) + 'B' : '-' },
                                { label: 'P/E (TTM)', value: stockData?.pe_ttm?.toFixed(2) },
                                { label: 'P/B', value: stockData?.pb_ratio?.toFixed(2) },
                                { label: 'Dividend (Yield)', value: stockData?.dividend_yield ? (stockData.dividend_yield * 100).toFixed(2) + '%' : '-' },
                                { label: 'Volume', value: stockData?.volume ? (stockData.volume / 1e6).toFixed(2) + 'M' : '-' },
                                { label: '52wk Range', value: stockData?.fifty_two_week_range || (stockData?.fifty_two_week_low && stockData?.fifty_two_week_high ? `${stockData.fifty_two_week_low} - ${stockData.fifty_two_week_high}` : '-') },
                                { label: 'Beta', value: stockData?.beta?.toFixed(2) },
                            ].map((item, i) => (
                                <div key={item.label} className={`flex flex-col ${i < 4 ? 'border-r border-slate-200/60 pr-4 last:border-r-0 md:last:border-r-0' : ''}`}> {/* Simplified styling logic, actual borders tricky in grid. Let's just remove borders for cleaner look or use simple separate divs */}
                                    <span className="text-xs text-slate-500 mb-1">{item.label}</span>
                                    <span className="text-xl font-bold text-slate-800">{item.value || '-'}</span>
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
                    <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col min-h-[380px]">
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
                        <div className="relative flex-1 p-8 flex flex-col justify-end">
                            <div className="w-full h-[220px]">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"></stop>
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,150 C50,150 60,100 100,100 C140,100 150,130 190,130 C230,130 240,60 280,60 C320,60 330,90 370,90 C410,90 420,30 460,30 L500,20 V200 H0 Z" fill="url(#chartGradient)"></path>
                                    <path d="M0,150 C50,150 60,100 100,100 C140,100 150,130 190,130 C230,130 240,60 280,60 C320,60 330,90 370,90 C410,90 420,30 460,30 L500,20" fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="3"></path>
                                </svg>
                            </div>
                            <div className="flex justify-between mt-6 border-t border-slate-100 pt-4">
                                <span className="text-slate-400 text-xs font-medium">2019</span>
                                <span className="text-slate-400 text-xs font-medium">2020</span>
                                <span className="text-slate-400 text-xs font-medium">2021</span>
                                <span className="text-slate-400 text-xs font-medium">2022</span>
                                <span className="text-slate-400 text-xs font-medium">2023</span>
                            </div>
                        </div>
                    </div>

                    {/* Peer Comparison Section */}
                    {uniquePeers.length > 0 && (
                        <div className="flex flex-col gap-4 mb-8">
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
                </div>
            </main>

            {/* Sidebar */}
            <aside className="w-[420px] shrink-0 bg-slate-50 border-l border-slate-200 flex flex-col">
                <div className="flex flex-col p-8 gap-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-2xl h-14 relative flex items-center overflow-hidden shadow-sm shrink-0 border border-slate-200">
                        <div className="h-full bg-primary progress-stripes transition-all duration-1000" style={{ width: '82%' }}></div>
                        <div className="absolute inset-0 flex items-center px-6 pointer-events-none">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] drop-shadow-sm">Report Engine</span>
                                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Compiling Data</span>
                            </div>
                        </div>
                    </div>

                    {/* Models Section */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">8 Models Analyzing</h4>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Active</span>
                            </div>
                        </div>
                        <div className="relative">
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

                            <div className="grid grid-cols-4 gap-3 relative z-10">
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-blue-200 transition-colors">
                                        <span className="processing-ring text-blue-500"></span>
                                        <img alt="Whale Model" className="w-5 h-5 opacity-80 model-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR2L8c9LVLrPa1sjoFRFmgOtldeGIWa6Lhpc8lp7axk-HSCmZD7PJL-5u9uMx01ovU7TSJG-Kks_luB1KwVIayWaATKZsqKkKWHfez4utno4qB1sebuiv3NPlcRAJlFvqKTqCXt5fs9A2ccP82MbfDn1Xhv9LZF82QivOaRjzGGPQDCsTs4ocpfvQ4_SrzTcGAwzSSFtUAjQ2A57B9rwjfBdrmkwxefL5CAWRVxtbsza-om-oaRA_oVjXwZ8LctrRazNPbncaIkSwC" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-purple-200 transition-colors">
                                        <span className="processing-ring text-purple-500" style={{ animationDelay: '0.2s' }}></span>
                                        <img alt="Star Model" className="w-5 h-5 opacity-80 model-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK7e_nj8NVVhZ_7BNh_uUuA6s8CI2_DxXtKHoyMLat1zD96wJqjguQSkjTqj3M14Lvu2UzaT8KGA8ADLUEiszczMNyrTNitJhzHRPkfoglKmyLeI8VGW_pU-f3D1tEholAJBtsgzGQ1dGH-G3X8o7w0tumIaAtu3fJK1OPP0AQKZfz8ELauFLUaRg4DmV4bxTR4Ue-qZXYQIJHi0CoeI6hHuBs4EdO5PDklZ6B6BaFL-YxF7e0KRpSGNOBTVu0vlDp8kgV8XMT6uFG" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-indigo-200 transition-colors">
                                        <span className="processing-ring text-indigo-500" style={{ animationDelay: '0.5s' }}></span>
                                        <img alt="Triangle Model" className="w-5 h-5 opacity-80 model-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACrvoG9UvfvHQtcrjtrIGkoiZzUnSkYhVKvpYKlV9NZmVlta_3cEyEw_xOjTImX7KE0zr25d2A5bBn90mvUsdNaOzGrScMccncQ_Wbk_bvxblQlzFul0LEnbFYHlkruH7X8H0WSzPqJb8s3U-H0JXg3qvLdH4mpXbDULRT_dv1fMWxQC4gFiEa-tIR-wIRE0MIrOI2rMulUz2zJPldA6cdDdsWFYiELZkOP2YDZ_jTU4F3Ddg8P8Z9rOLpIIWZv46zsiT1hnyushun" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-emerald-200 transition-colors">
                                        <span className="processing-ring text-emerald-500" style={{ animationDelay: '0.1s' }}></span>
                                        <img alt="Geometric Model" className="w-5 h-5 opacity-80 model-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj1KPXnJ-9VdUnZuHXLIz6x6xhlg0jHjHjkeR3uGabzozmgqlRwj1oLUTxbN7mquDF4y1CzrDsW0dvCMJhDFCdgFIIA1PsXAnmO4fVFD0zeeQkFjLK41jYhoA7-HKw00G4-GUhpqEdrTATMNz_5bQ25JzwO63FhPwiPUB1xCIYbycDe4qHLB6i9Ugp63pWVsEfU3m8X20eiZ7LtXfJSopAv63-kgh2EBiFd72goSdBTq9WQCa4oXd4IE2gjuBerIRsCUTlxrKisdgI" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-orange-200 transition-colors">
                                        <span className="processing-ring text-orange-500" style={{ animationDelay: '0.3s' }}></span>
                                        <span className="material-symbols-outlined text-orange-400 text-[20px] model-icon scale-90">psychology</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-cyan-200 transition-colors">
                                        <span className="processing-ring text-cyan-500" style={{ animationDelay: '0.6s' }}></span>
                                        <span className="material-symbols-outlined text-cyan-400 text-[20px] model-icon scale-90">show_chart</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-rose-200 transition-colors">
                                        <span className="processing-ring text-rose-500" style={{ animationDelay: '0.4s' }}></span>
                                        <span className="material-symbols-outlined text-rose-400 text-[20px] model-icon scale-90">smart_toy</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 group">
                                    <div className="relative w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-teal-200 transition-colors">
                                        <span className="processing-ring text-teal-500" style={{ animationDelay: '0.7s' }}></span>
                                        <span className="material-symbols-outlined text-teal-400 text-[20px] model-icon scale-90">database</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Terminal */}
                    <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
                        <div className="px-5 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[20px] text-slate-400">terminal</span>
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Live Analysis Terminal</span>
                            </div>
                            <span className="relative flex size-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
                            </span>
                        </div>
                        <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-500 bg-white scroll-smooth">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:01]</span>
                                    <span>Connected to <span className="text-primary font-bold">SecureStream v4.2.1</span></span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:02]</span>
                                    <span>Validating user session tokens...</span>
                                </div>
                                <div className="pl-16">
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-bold uppercase">Authorized</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:04]</span>
                                    <span>Processing Q3 Earnings Transcript...</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:15]</span>
                                    <span>Calculating 5Y CAGR metrics for ticker AAPL</span>
                                </div>
                                <div className="pl-16">
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold uppercase">Running Analysis</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:21]</span>
                                    <span>Cross-referencing peer volatility (MSFT, GOOG)</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:24]</span>
                                    <span>Generating volatility index... 0.85 (Stable)</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:28]</span>
                                    <span>Fetching real-time options flow data</span>
                                </div>
                                <div className="pl-16">
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-bold uppercase">Info: High Interest</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:35]</span>
                                    <span>Aggregating sentiment from 42 external sources</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:41]</span>
                                    <span>Model Confidence: 94.2%</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:48]</span>
                                    <span>Generating risk-adjusted return forecasts</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-400 select-none">[10:42:55]</span>
                                    <span>Analyzing supply chain resilience markers...</span>
                                </div>
                                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                    <span className="text-slate-400 select-none">&gt;</span>
                                    <span className="font-bold text-slate-800">Finalizing Comprehensive Report...</span>
                                    <span className="animate-pulse w-2 h-4 bg-slate-800 inline-block align-middle ml-1"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insight Card */}
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-soft-xl group cursor-pointer border border-slate-200 bg-slate-900 aspect-[672/900] shrink-0">
                        <img alt="Investment Tip Poster" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlSfGM_2LwPqssJpivRsEsbMlIpzEguFTRJSDFP6SseGL1DPJ63o4TuCQ-uKgC9q20Xdax0E2PG-DG2O24dXRufCMKzoeHDjpoE7HQ4xYkEGLfWiG8_H6SWiYdTLoZmttOSN5E_6ex01WSU3kcjASdORUyAq_m0RHE5KLRE_x-B2n32TJVGwnyMrlztZYIJ9jTu_AzKyjvO0ad3rnS7LbCaHgp7aaAu7c4wO1SPE8B_87TWYFAcidIVzbYuEEEr8_A06WwcE99wKgA" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <div className="mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-5">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-400">auto_awesome</span>
                                    AI Strategic Insights
                                </span>
                                <h4 className="text-3xl font-extrabold text-white leading-tight mb-4">Supply Chain Efficiency</h4>
                                <p className="text-slate-300 text-sm font-medium leading-relaxed opacity-90">
                                    Our models detected a 15% increase in inventory turnover, signaling strong operational improvements and potential margin expansion in upcoming quarters.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                                </div>
                                <span className="text-[10px] text-white/70 font-black uppercase tracking-[0.2em]">Insight 1 of 3</span>
                            </div>
                        </div>
                    </div>
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
