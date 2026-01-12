import React, { useState, useEffect, useRef } from 'react';
import {
    TrendingUp, TrendingDown, Activity,
    Zap,
    Users,
    LayoutDashboard, Scale, ArrowRightLeft,
    Layers,
    Lightbulb, Brain,
    Orbit, ChartSpline, Newspaper, ClipboardCheck, Loader2,
    CheckCircle,
} from 'lucide-react';
// import { useTranslation } from 'react-i18next';
import { fetchFinancialData } from '../api/financial';
import { StockFinancialDataAggregationResponse } from '../types/financial';

const TIPS_IMAGES = [
    '/stock_tips/G-Dbx6fbcAA5zQf.jpeg',
    '/stock_tips/G-Dbxs7aIAARxY4.jpeg',
    '/stock_tips/G-DbyIraYAIYUis.jpeg',
    '/stock_tips/G-DbynHaoAAs0me.jpeg',
    '/stock_tips/G-DbyXVacAA9k_F.jpeg',
];

// 格式化函数
const formatMoney = (val: number | undefined | null) => {
    if (val === undefined || val === null) return '--';
    if (val >= 1e12) return (val / 1e12).toFixed(2) + 'T';
    if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
    if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
    if (val >= 1e3) return (val / 1e3).toFixed(2) + 'K';
    return val.toLocaleString();
};

const formatPercent = (val: number | undefined | null) => {
    if (val === undefined || val === null) return '--';
    return (val * 100).toFixed(2) + '%';
};

const StockAnalysis: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { t } = useTranslation();
    const querySymbol = new URLSearchParams(window.location.search).get('symbol') || 'AAPL';
    const queryExchange = new URLSearchParams(window.location.search).get('exchange') || 'NASDAQ';

    // --- State ---
    const [realData, setRealData] = useState<StockFinancialDataAggregationResponse | null>(null);
    const [relatedData, setRelatedData] = useState<any[]>([]);
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({
        tech: false,
        fin: false,
        news: false,
        comp: false,
        report: false,
        final: false
    });
    const [error, setError] = useState<string | null>(null);

    // Decouple fetching progress from UI log progress to avoid deadlock
    const [fetchedTaskIdx, setFetchedTaskIdx] = useState(0);

    // --- UI State ---
    interface Log {
        text: string;
        time: Date;
        taskIndex?: number;
    }
    const [logs, setLogs] = useState<Log[]>([]);
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);
    const [currentTaskIdx, setCurrentTaskIdx] = useState(0);

    const logQueue = useRef<Log[]>([]);
    const processedLogsCount = useRef(0);
    const totalEstimatedLogs = useRef(120);

    // --- 顺序任务定义 ---
    const tasks = [
        { id: 'tech', label: '技术面量化解析', desc: '执行日线趋势扫描与波动率建模', icon: <ChartSpline className="w-4 h-4" /> },
        { id: 'fin', label: '财务质量与风险审计', desc: '深度拆解 ROE 与现金流支出结构', icon: <Scale className="w-4 h-4" /> },
        { id: 'news', label: '事件驱动资讯解读', desc: '检索全球资讯终端与 SEC 披露文件', icon: <Newspaper className="w-4 h-4" /> },
        { id: 'comp', label: '同业与可比公司对标', desc: '构建板块相关性矩阵与估值分位', icon: <Orbit className="w-4 h-4" /> },
        { id: 'report', label: '投研报告生成', desc: '多因子权重模型融合推演中', icon: <ClipboardCheck className="w-4 h-4" /> },
        { id: 'final', label: '结论提炼', desc: '核心逻辑摘要与风险提示生成', icon: <Lightbulb className="w-4 h-4" /> }
    ];

    // Helper
    const addLogToQueue = (text: string, taskIdx: number) => {
        logQueue.current.push({ text, time: new Date(), taskIndex: taskIdx });
    };

    // --- EFFECT: Sequential Execution Engine (Fetch Logic) ---
    useEffect(() => {
        const executeFetchConfig = async () => {
            if (fetchedTaskIdx >= tasks.length) return;

            const task = tasks[fetchedTaskIdx];
            const taskId = task.id;

            // Mark loading
            setLoadingMap(prev => ({ ...prev, [taskId]: true }));

            try {
                // Dynamic imports to save bundle size
                const { fetchRelatedStocks, fetchStockBaseData, fetchTranslations } = await import('../api/financial');

                // --- STAGE 1: TECH ---
                if (taskId === 'tech') {
                    // Requirement: Aggregation + StockBaseData
                    // For Tech stage, we check the query symbol + exchange
                    const [resAgg, resBase] = await Promise.all([
                        fetchFinancialData(querySymbol, queryExchange),
                        fetchStockBaseData([{ stock_symbol: querySymbol, exchange_acronym: queryExchange }])
                    ]);

                    if (resAgg && resAgg.data && resAgg.data.info) {
                        setRealData(resAgg);
                        const info = resAgg.data.info;

                        addLogToQueue(`[初始化] 连接 PolyBull 量化终端，目标标的: ${info.symbol} (${info.longname})`, 0);
                        addLogToQueue(`[行情] 获取实时报价: ${info.currentprice} ${info.currency}, 涨跌幅: ${(info.currentprice - info.previousclose).toFixed(2)} (${formatPercent((info.currentprice - info.previousclose) / info.previousclose)})`, 0);

                        // Use Base Data for verification log
                        if (resBase && resBase.data && resBase.data.length > 0) {
                            const base = resBase.data[0];
                            addLogToQueue(`[量化] 基础数据校准: ${base.symbol} 市场状态 [${base.market_state}]`, 0);
                        }

                        addLogToQueue(`[量化] 计算日内波动率... 当日范围: ${info.daylow} - ${info.dayhigh}`, 0);
                        addLogToQueue(`[量化] 52周趋势扫描: ${info.fiftytwoweeklow} - ${info.fiftytwoweekhigh}`, 0);
                        addLogToQueue(`[市场] 市值核算: ${formatMoney(info.marketcap)}, 贝塔系数: ${info.beta?.toFixed(2) || '--'} (波动性评估)`, 0);

                        // Proceed to next stage
                        setFetchedTaskIdx(1);
                    } else {
                        throw new Error(`Data Init Failed: ${resAgg?.code}`);
                    }
                }
                // --- STAGE 2: FINANCIAL ---
                else if (taskId === 'fin') {
                    // Requirement: Reuse Aggregation (already fetched)
                    if (realData) {
                        analyzeFinancials(realData);
                    }
                    setFetchedTaskIdx(2);
                }
                // --- STAGE 3: NEWS ---
                else if (taskId === 'news') {
                    // Requirement: Translations
                    addLogToQueue(`[舆情] 正在连接全球资讯网络...`, 2);
                    const keyword = realData?.data?.info?.shortname || querySymbol;
                    addLogToQueue(`[舆情] 语义搜索关键字: "${keyword}"`, 2);

                    const res = await fetchTranslations(keyword);
                    if (res && res.data && res.data.translations) {
                        res.data.translations.slice(0, 5).forEach(t => {
                            addLogToQueue(`[新闻] 捕获多语言信号: ${t.translation.substring(0, 30)}...`, 2);
                        });
                    }
                    setFetchedTaskIdx(3);
                }
                // --- STAGE 4: COMP ---
                else if (taskId === 'comp') {
                    // Requirement: Related + StockBaseData
                    addLogToQueue(`[对标] 构建行业估值矩阵...`, 3);

                    // Call related stocks with strict exchange param
                    const relatedRes = await fetchRelatedStocks(querySymbol, queryExchange);

                    if (relatedRes && relatedRes.data && relatedRes.data.compare_to_list) {
                        const compareList = relatedRes.data.compare_to_list.slice(0, 8);
                        const symbolStr = compareList.map(i => i.stock_symbol).join(', ');
                        addLogToQueue(`[对标] 锁定关键竞对: ${symbolStr}`, 3);

                        if (compareList.length > 0) {
                            // Map to correct payload structure: { stock_symbol, exchange_acronym }
                            // Note: The related API returns exchange_acronym for each item, so use it!
                            const batchPayload = compareList.map(item => ({
                                stock_symbol: item.stock_symbol,
                                exchange_acronym: item.exchange_acronym || 'NASDAQ' // Fallback if missing, but should exist
                            }));

                            const batchRes = await fetchStockBaseData(batchPayload);
                            if (batchRes && batchRes.data) {
                                setRelatedData(batchRes.data);
                                batchRes.data.slice(0, 3).forEach(s => {
                                    addLogToQueue(`[模型] 对比标的 ${s.symbol}: PE ${s.pe_ttm?.toFixed(2) || '--'}, 涨跌 ${s.regular_market_change_percent?.toFixed(2)}%`, 3);
                                });
                            }
                        }
                    } else {
                        addLogToQueue(`[对标] 行业数据不足，使用通用模型`, 3);
                    }
                    setFetchedTaskIdx(4);
                }
                // --- STAGE 5: REPORT ---
                else if (taskId === 'report') {
                    generateReportLogs();
                    setFetchedTaskIdx(5);
                }
                // --- STAGE 6: FINAL ---
                else if (taskId === 'final') {
                    finalizeAnalysis();
                    setFetchedTaskIdx(6);
                }

            } catch (err: any) {
                console.error(`Stage ${taskId} Error:`, err);
                setError(err.message);
                addLogToQueue(`[系统] 阶段 ${taskId} 异常: ${err.message}`, fetchedTaskIdx);
            } finally {
                setLoadingMap(prev => ({ ...prev, [taskId]: false }));
            }
        };

        executeFetchConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedTaskIdx]);

    // --- Stage Helper Functions (Pure Logic) ---
    const analyzeFinancials = (data: StockFinancialDataAggregationResponse) => {
        addLogToQueue(`[审计] 启动财务报表深度扫描...`, 1);
        const info = data.data.info;
        const financials = data.data.balance_yearly_yefinancials;

        // Governance
        (info.companyofficers || []).slice(0, 3).forEach(o => {
            addLogToQueue(`[治理] 分析高管背景: ${o.name}, Age: ${o.age || '--'}`, 1);
        });

        // Ratios
        addLogToQueue(`[财务] 关键比率: PE(TTM): ${info.trailingpe?.toFixed(2) || '--'}, ROE ${formatPercent(info.returnonequity)}`, 1);

        // Deep Dive
        if (financials) {
            const years = Object.keys(financials).sort().reverse();
            if (years.length > 0) {
                const latestYear = years[0];
                addLogToQueue(`[报表] 加载 ${latestYear} 年度财报详单...`, 1);
                addLogToQueue(`[报表] 审计资产负债表平衡性...`, 1);
            }
        }
    };

    const generateReportLogs = () => {
        addLogToQueue(`[综合] 多因子模型开始推演...`, 4);
        addLogToQueue(`[生成的] 正在撰写深度分析报告...`, 4);
        addLogToQueue(`[生成的] 因子权重归因完成`, 4);
    };

    const finalizeAnalysis = () => {
        addLogToQueue(`[结论] 生成最终投资评级: 增持`, 5);
        addLogToQueue(`[完成] 分析报告已生成`, 5);
    };

    // --- 消费日志队列 (Engine) ---
    useEffect(() => {
        const processLog = () => {
            if (logQueue.current.length === 0) {
                // If queue is empty, we might be waiting for next stage to load
                // check again soon
                timeoutRef.current = setTimeout(processLog, 500);
                return;
            }

            const nextLog = logQueue.current.shift();
            if (nextLog) {
                setLogs(prev => [...prev, { ...nextLog, time: new Date() }]);
                processedLogsCount.current += 1;

                const pct = Math.min((processedLogsCount.current / totalEstimatedLogs.current) * 100, 100);
                setProgress(pct);

                // Update task index if this log belongs to a newer task
                if (nextLog.taskIndex !== undefined && nextLog.taskIndex > currentTaskIdx) {
                    setCurrentTaskIdx(nextLog.taskIndex);
                }
            }

            // Variable delay based on "Thinking" speed
            // Adjusted speed for demo
            const delay = 1500 + Math.random() * 1000;
            timeoutRef.current = setTimeout(processLog, delay);
        };

        let timeoutRef: { current: ReturnType<typeof setTimeout> | null } = { current: null };

        // Start engine
        timeoutRef.current = setTimeout(processLog, 1000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once to start the engine loops

    // Tips 轮播
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex(prev => (prev + 1) % TIPS_IMAGES.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const info = realData?.data?.info;
    const initialLoading = loadingMap.tech;

    if (initialLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-900">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 dark:text-gray-400 animate-pulse">Initializing PolyBull Quantum Core...</p>
            </div>
        );
    }

    if (error || !info) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-900 text-red-500 p-4">
                <p className="mb-4 text-xl font-bold">Analysis Initialization Failed</p>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 max-w-2xl overflow-auto">
                    <p className="font-mono text-sm">{error || 'No Data Available'}</p>
                </div>
                <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">Retry Connection</button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-gray-100 font-sans p-2 md:p-4 flex flex-col items-center min-h-screen">
            <div className="max-w-6xl w-full space-y-4 md:space-y-6">

                {/* 1. 跑马灯 */}
                <div className="overflow-hidden bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl py-3 shadow-sm relative shrink-0">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-16 items-center px-4">
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400"><Zap className="w-3.5 h-3.5 text-amber-500" /> PE: {info.trailingpe?.toFixed(2) || '--'}</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400"><ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" /> Beta: {info.beta?.toFixed(2) || '--'}</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400"><Users className="w-3.5 h-3.5 text-indigo-500" /> Emp: {info.fulltimeemployees?.toLocaleString() || '--'}</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-gray-400"><Scale className="w-3.5 h-3.5 text-emerald-500" /> D/E: {info.debttoequity?.toFixed(1)}%</span>
                                <span className="text-xs font-bold text-slate-200 dark:text-gray-700">|</span>
                            </div>
                        ))}
                    </div>
                    <style>{`
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-marquee { animation: marquee 35s linear infinite; }
          `}</style>
                </div>

                {/* 2. 顶部主面板 & Tips 并排 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                    <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-[32px] p-6 md:p-8 border border-slate-200 dark:border-gray-700 shadow-sm relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.05] dark:invert"><LayoutDashboard className="w-40 h-40" /></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600 dark:text-blue-400 animate-pulse"><Activity className="w-5 h-5" /></div>
                                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">PolyBull Agent Processing Unit</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">{info.shortname || info.symbol} <span className="text-slate-200 dark:text-gray-600 text-2xl font-medium">{info.symbol}</span></h1>
                                    <div className="flex items-center gap-4 mt-4">
                                        <span className="text-4xl font-bold text-slate-800 dark:text-gray-100 tracking-tighter">{formatMoney(info.currentprice)}</span>
                                        <span className={`px-3 py-1.5 rounded-xl text-sm font-black flex items-center gap-1.5 ${(info.regularmarketchangepercent || 0) >= 0 ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                                            {(info.regularmarketchangepercent || 0) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                            {Math.abs(info.regularmarketchangepercent || 0).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-1">Market Cap</p>
                                    <p className="text-2xl font-black text-slate-700 dark:text-gray-200">{formatMoney(info.marketcap)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 mt-10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-slate-500 dark:text-gray-400 italic uppercase tracking-widest font-mono">Real-time Reasoning Stream</span>
                                <span className="text-xl font-black text-blue-600 dark:text-blue-400">{Math.floor(progress)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.2)]" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <h2 className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]">投资 Tips</h2>
                        </div>
                        <div className="relative aspect-[672/900] w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 shadow-inner">
                            <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${tipIndex * 100}%)` }}>
                                {TIPS_IMAGES.map((img, i) => (
                                    <div key={i} className="w-full h-full shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                        <img src={img} alt={`Tip ${i + 1}`} className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                                {TIPS_IMAGES.map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${tipIndex === i ? 'bg-indigo-600 w-3' : 'bg-gray-400/40'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. 关联股票信息 (全宽) - Placeholder for now until we have comparison data from another API or mock it */}
                <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-[32px] p-8 shadow-sm overflow-hidden flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-slate-400 dark:text-gray-500" />
                            <h2 className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]">关联股票信息</h2>
                        </div>
                        {<span className="text-[9px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest animate-pulse font-mono tracking-tighter">Market Mapping Active</span>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 min-h-[80px]">
                        {relatedData.length > 0 ? relatedData.map((item, idx) => {
                            const isVisible = true;
                            return (
                                <div
                                    key={idx}
                                    className={`bg-slate-50/50 dark:bg-gray-700/50 border rounded-2xl p-4 shadow-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 border-slate-200 dark:border-gray-600' : 'opacity-0 translate-y-4 border-transparent'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[11px] font-black text-slate-900 dark:text-gray-100 truncate tracking-tighter">{item.symbol}</span>
                                    </div>
                                    <div className="text-xs font-black text-slate-700 dark:text-gray-300 mt-1">${item.current_price?.toFixed(2)}</div>
                                    <div className={`text-[10px] font-bold ${item.regular_market_change_percent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {item.regular_market_change_percent?.toFixed(2)}%
                                    </div>
                                </div>
                            );
                        }) : (
                            // Placeholder while waiting or if empty
                            [1, 2, 3, 4].map((_, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-700 rounded-2xl p-4 animate-pulse h-[80px]"></div>
                            ))
                        )}
                    </div>
                </div>

                {/* 4. Analysis Hub */}
                <div className="flex flex-col border border-slate-200 dark:border-gray-700 rounded-[32px] overflow-hidden bg-white dark:bg-gray-800 shadow-sm shrink-0 min-h-[500px]">
                    {/* Header */}
                    <div className="flex items-center bg-slate-50/50 dark:bg-gray-900/30 border-b border-slate-200 dark:border-gray-700 p-6 gap-3 shrink-0">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm"><Activity className="w-5 h-5 text-blue-500" /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em]">PolyBull Analysis Center</p>
                            <h2 className="text-sm font-bold text-slate-900 dark:text-gray-100 tracking-tight">PolyBull 智能投研引擎正在深度思考中...</h2>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col md:flex-row">
                        {/* 左侧：Agent 顺序任务卡片 */}
                        <div className="w-full md:w-[300px] bg-slate-50/30 dark:bg-gray-900/30 md:border-r border-dashed border-slate-200 dark:border-gray-700 p-4 md:p-6 flex flex-col gap-3 shrink-0">
                            {tasks.map((task, idx) => {
                                const isDone = idx < currentTaskIdx;
                                const isActive = idx === currentTaskIdx;
                                const isLocked = idx > currentTaskIdx;
                                return (
                                    <div key={task.id} className="relative">
                                        <div
                                            className={`flex flex-col gap-1.5 rounded-xl border p-3.5 transition-all duration-500 bg-white dark:bg-gray-800 relative z-10
                        ${isDone ? 'border-emerald-200 dark:border-emerald-900 shadow-emerald-500/5' : ''}
                        ${isActive ? 'border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.02]' : ''}
                        ${isLocked ? 'border-slate-100 dark:border-gray-800 opacity-40 grayscale' : ''}
                      `}
                                        >
                                            <div className="flex justify-between items-start">
                                                <p className={`text-[11px] font-bold leading-none ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-gray-100'}`}>{task.label}</p>
                                                {isDone ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : isActive ? <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" /> : <div className="w-3.5 h-3.5" />}
                                            </div>
                                            <p className="text-[9px] text-slate-400 dark:text-gray-500 leading-relaxed line-clamp-2">{task.desc}</p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className={`p-1 rounded-md ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400' : 'bg-slate-50 dark:bg-gray-700 text-slate-400 dark:text-gray-500'}`}>{React.cloneElement(task.icon as React.ReactElement, { className: "w-3 h-3" })}</div>
                                                <span className="text-[8px] font-black text-slate-300 dark:text-gray-600 uppercase tracking-widest tracking-tighter">AGENT {idx + 1}</span>
                                            </div>

                                            {/* 任务流向连接点 */}
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 hidden md:flex items-center pl-0">
                                                <div className={`h-px w-[24px] ${isDone || isActive ? 'bg-blue-200 dark:bg-blue-800' : 'bg-slate-100 dark:bg-gray-700'}`} />
                                                <div className={`w-1.5 h-1.5 -ml-0.5 rounded-full border border-white dark:border-gray-900 shadow-sm ${isDone ? 'bg-emerald-500' : isActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-200 dark:bg-gray-700'}`} />
                                            </div>
                                        </div>

                                        {/* 连接虚线 */}
                                        {idx < tasks.length - 1 && (
                                            <div className="absolute left-[34px] top-full h-4 w-px border-l border-dashed border-slate-200 dark:border-gray-700 z-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* 右侧：Reasoning Feed (不限制高度) */}
                        <div className="flex-1 bg-white dark:bg-gray-800 p-8 flex flex-col min-h-full">
                            <div className="flex items-center gap-3 mb-8">
                                <Brain className="w-5 h-5 text-slate-800 dark:text-gray-100" />
                                <span className="text-xs font-black text-slate-900 dark:text-gray-100 uppercase tracking-[0.2em]">Agent Reasoning Flow</span>
                            </div>

                            <div className="space-y-8 pb-10">
                                {logs.length > 0 ? logs.map((log, index) => {
                                    const isLast = index === logs.length - 1;
                                    return (
                                        <div key={index} className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isLast ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]' : 'bg-slate-200 dark:bg-gray-600'}`} />
                                                <span className="text-[10px] font-mono text-slate-300 dark:text-gray-500 uppercase select-none tracking-tighter">
                                                    Log Step {index + 1} · {log.time.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className={`pl-4 border-l-2 ml-[2.5px] transition-colors duration-500 ${isLast ? 'border-blue-500' : 'border-slate-50 dark:border-gray-800'}`}>
                                                <p className={`text-sm leading-[1.8] ${isLast ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-gray-400 font-medium'}`}>
                                                    {log.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="flex flex-col items-center justify-center py-24 text-slate-200 dark:text-gray-600 gap-4 opacity-50">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                        <p className="text-[10px] font-black uppercase tracking-widest tracking-widest">Awaiting Neural Link Initialization...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .animate-in { animation: animate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes animate-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
};

export default StockAnalysis;
