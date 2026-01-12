import React from 'react';

const AnalysisInProgress: React.FC = () => {
    return (
        <div className="bg-background-light font-display text-slate-900 min-h-screen flex flex-col overflow-hidden">
            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                <div className="flex-[2] flex flex-col overflow-y-auto min-w-0 bg-background-light p-6 lg:p-8 gap-6 scrollbar-thin scrollbar-thumb-slate-300">
                    <div className="flex flex-wrap justify-between items-end gap-4 pb-2 border-b border-slate-200">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">AAPL</h1>
                                <span className="text-slate-500 text-lg font-medium">Apple Inc.</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-slate-900 text-2xl font-bold">$185.92</span>
                                <div className="flex items-center text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-sm font-medium">
                                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                                    +2.35 (1.2%)
                                </div>
                                <span className="text-xs text-slate-500 ml-1">Market Open • NASDAQ</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center justify-center h-9 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-[18px] mr-2">notifications_active</span>
                                Set Alert
                            </button>
                            <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-sm font-medium transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-[18px] mr-2">stop_circle</span>
                                Stop Generation
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                                <h3 className="text-slate-900 font-semibold">Price History</h3>
                                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">1D</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">1W</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">1M</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-900 bg-white shadow-sm rounded-md ring-1 ring-slate-200 transition-colors">5Y</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">ALL</button>
                                </div>
                            </div>
                            <div className="relative flex-1 p-4 flex flex-col">
                                <div className="flex-1 w-full h-full min-h-[280px]">
                                    <svg className="w-full h-full" fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="239" x2="239" y1="21" y2="149">
                                                <stop stopColor="#135bec" stopOpacity="0.2"></stop>
                                                <stop offset="1" stopColor="#135bec" stopOpacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear_chart)"></path>
                                        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#135bec" strokeLinecap="round" strokeWidth="2.5"></path>
                                    </svg>
                                </div>
                                <div className="flex justify-between mt-4 px-2">
                                    <p className="text-slate-400 text-xs font-medium">2019</p>
                                    <p className="text-slate-400 text-xs font-medium">2020</p>
                                    <p className="text-slate-400 text-xs font-medium">2021</p>
                                    <p className="text-slate-400 text-xs font-medium">2022</p>
                                    <p className="text-slate-400 text-xs font-medium">2023</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 xl:col-span-1 h-full">
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <p className="text-slate-500 text-sm font-medium">P/E Ratio</p>
                                    <span className="material-symbols-outlined text-slate-300 text-[20px]">data_usage</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-2xl font-bold font-mono tracking-tight mt-2">28.50</p>
                                    <p className="text-emerald-600 text-xs font-medium mt-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
                                        +0.5% vs Sector
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <p className="text-slate-500 text-sm font-medium">Market Cap</p>
                                    <span className="material-symbols-outlined text-slate-300 text-[20px]">pie_chart</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-2xl font-bold font-mono tracking-tight mt-2">2.87T</p>
                                    <p className="text-emerald-600 text-xs font-medium mt-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
                                        +1.2% YTD
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <p className="text-slate-500 text-sm font-medium">EPS (TTM)</p>
                                    <span className="material-symbols-outlined text-slate-300 text-[20px]">attach_money</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-2xl font-bold font-mono tracking-tight mt-2">6.13</p>
                                    <p className="text-emerald-600 text-xs font-medium mt-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
                                        +0.2% vs Est.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <p className="text-slate-500 text-sm font-medium">Beta (5Y)</p>
                                    <span className="material-symbols-outlined text-slate-300 text-[20px]">waves</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-2xl font-bold font-mono tracking-tight mt-2">1.21</p>
                                    <p className="text-red-500 text-xs font-medium mt-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_downward</span>
                                        Higher Volatility
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-slate-900 font-semibold">Peer Comparison</h3>
                            <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Competitor</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Price</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Change</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">P/E</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Market Cap</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs mr-3 border border-blue-100">MSFT</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Microsoft</div>
                                                    <div className="text-xs text-slate-500">Tech • Software</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">$420.55</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600 font-medium">+0.8%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">36.2</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">3.1T</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="size-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs mr-3 border border-red-100">GOOG</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Alphabet</div>
                                                    <div className="text-xs text-slate-500">Tech • Internet</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">$173.20</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-500 font-medium">-0.4%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">26.4</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">2.2T</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="size-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xs mr-3 border border-amber-100">AMZN</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Amazon</div>
                                                    <div className="text-xs text-slate-500">Tech • Retail</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">$178.15</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600 font-medium">+1.5%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">62.1</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono text-slate-600">1.8T</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <aside className="w-[400px] shrink-0 border-l border-slate-200 bg-white flex flex-col hidden lg:flex">
                    <div className="p-6 border-b border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Analysis in Progress</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">Generating Deep Dive Report</h3>
                        <p className="text-sm text-slate-500 mb-4">Estimated remaining time: <span className="text-slate-900 font-mono">~18s</span></p>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: '45%' }}></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-400">
                            <span>Initiated</span>
                            <span>45%</span>
                            <span>Finalizing</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 border-b border-slate-100">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Analyzing Recent Context</h4>
                        <div className="group relative pl-4 border-l-2 border-slate-200 hover:border-primary transition-colors cursor-pointer">
                            <div className="absolute -left-[5px] top-1 size-2 bg-slate-300 rounded-full group-hover:bg-primary transition-colors"></div>
                            <span className="text-[10px] text-slate-400 font-mono mb-1 block">Today, 09:15 AM</span>
                            <h5 className="text-sm font-medium text-slate-700 leading-snug group-hover:text-primary transition-colors">Apple Vision Pro supply chain adjustments hint at production ramp-up.</h5>
                            <div className="mt-2 flex gap-2">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">Supply Chain</span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">Positive</span>
                            </div>
                        </div>
                        <div className="group relative pl-4 border-l-2 border-slate-200 hover:border-primary transition-colors cursor-pointer">
                            <div className="absolute -left-[5px] top-1 size-2 bg-slate-300 rounded-full group-hover:bg-primary transition-colors"></div>
                            <span className="text-[10px] text-slate-400 font-mono mb-1 block">Yesterday, 04:45 PM</span>
                            <h5 className="text-sm font-medium text-slate-700 leading-snug group-hover:text-primary transition-colors">Competitor analysis: Microsoft Copilot integration poses threat to Siri market share.</h5>
                            <div className="mt-2 flex gap-2">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">Competition</span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">Neutral</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[280px] bg-slate-50 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-500 text-[14px]">terminal</span>
                                <span className="text-xs font-mono text-slate-600">Live Logs</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="size-2.5 rounded-full bg-slate-300"></div>
                                <div className="size-2.5 rounded-full bg-slate-300"></div>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-hidden font-mono text-xs leading-relaxed relative">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-10"></div>
                            <div className="flex flex-col justify-end h-full gap-1">
                                <p className="text-slate-400 opacity-50">&gt; Initializing session...</p>
                                <p className="text-emerald-600">[SUCCESS] Q3 Earnings Transcripts parsed.</p>
                                <p className="text-slate-500">&gt; Extracting macro-economic correlation factors...</p>
                                <p className="text-slate-500">&gt; Fetching 10-K filings from EDGAR database...</p>
                                <p className="text-emerald-600">[SUCCESS] Sentiment analysis model loaded.</p>
                                <p className="text-slate-500">&gt; Cross-referencing insider trading patterns...</p>
                                <p className="text-blue-600">[PROCESSING] Analyzing sentiment on latest product launch...</p>
                                <p className="text-slate-500">&gt; Calculating volatility indices (VIX vs AAPL)...</p>
                                <p className="text-amber-600 animate-pulse">&gt; [ACTIVE] Correlating sector volatility...</p>
                                <span className="w-2 h-4 bg-primary animate-pulse inline-block align-middle ml-1"></span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default AnalysisInProgress;
