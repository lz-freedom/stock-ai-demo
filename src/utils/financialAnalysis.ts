
import { AppStockBaseQuotaUsingGetResponse, AppStockRelatedInfoUsingGetResponse, CommonStockBaseDataResStockFinancialsItem } from '@/api/app/types';

/**
 * Helper to format large numbers as Billions (B) or Millions (M)
 */
const formatNumber = (num: number | undefined): string => {
    if (num === undefined || num === null) return 'N/A';
    const absNum = Math.abs(num);
    if (absNum >= 1e9) {
        return (num / 1e9).toFixed(3) + 'B';
    }
    if (absNum >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    }
    return num.toLocaleString();
};

/**
 * Helper to format percentages
 */
const formatPercent = (num: number | undefined): string => {
    if (num === undefined || num === null) return 'N/A';
    return (num * 100).toFixed(2) + '%';
};

/**
 * Helper to format standard huge numbers (e.g. 102,466,000,000 USD)
 * Also appends a roughly converted "Billions" string in Chinese context if needed, 
 * but here we follow the user's English script format: "102,466,000,000 USD（约 1024.66 亿）"
 */
const formatCurrencyWithCNDescription = (num: number | undefined): string => {
    if (num === undefined || num === null) return 'N/A';
    const original = num.toLocaleString() + ' USD';
    const billions = (num / 1e8).toFixed(2); // Convert to Yi (100 Million)
    return `${original}（约 ${billions} 亿）`;
};

/**
 * Generate the financial analysis logs based on the provided data.
 * The input data is expected to be the latest available report (e.g. quarterly).
 */
export const generateFinancialLogs = (
    income?: CommonStockBaseDataResStockFinancialsItem,
    balance?: CommonStockBaseDataResStockFinancialsItem,
    cashflow?: CommonStockBaseDataResStockFinancialsItem
): string[] => {
    const logs: string[] = [];

    // Helper timestamps
    const incomeDate = income?.date || 'N/A';
    const balanceDate = balance?.date || 'N/A';
    const cashflowDate = cashflow?.date || 'N/A';

    // === Header ===
    logs.push("=== 财报三表补充（你这份 snake_case 字段版本）===");
    logs.push(`读取报告期：date=${incomeDate}（请在UI明确这是“季度/TTM/年报”中的哪一种，避免口径混淆）。`); // Using income date as representative

    // Check inconsistencies
    const incomeNet = income?.netIncome || 0;
    const cashflowNet = cashflow?.netIncomeFromContinuingOperations || 0;
    if (income && cashflow && Math.abs(incomeNet - cashflowNet) > 1e9) {
        logs.push(`注意：你给的三表里存在“口径不一致”的迹象：利润表 net_income=${formatNumber(incomeNet)}，但现金流里 net_income_from_continuing_operations=${formatNumber(cashflowNet)}（更像TTM/年报）。`);
    }
    logs.push("因此展示策略：先按“各表自洽”解读，同时在末尾输出“口径一致性提醒”。");

    // === Income Statement ===
    if (income) {
        logs.push(`=== income_statement 利润表（${incomeDate}）===`);
        logs.push(`读取营业收入：total_revenue=${formatCurrencyWithCNDescription(income.totalRevenue)}。`);
        logs.push(`读取营业成本：cost_of_revenue=${formatCurrencyWithCNDescription(income.costOfRevenue)}。`);
        logs.push(`读取毛利：gross_profit=${formatCurrencyWithCNDescription(income.grossProfit)}。`);

        if (income.grossProfit && income.totalRevenue) {
            const gm = income.grossProfit / income.totalRevenue;
            logs.push(`计算毛利率：gross_profit / total_revenue ≈ ${formatNumber(income.grossProfit)} / ${formatNumber(income.totalRevenue)} = ${formatPercent(gm)}。`);
        }

        logs.push(`读取营业费用合计：operating_expense=${formatCurrencyWithCNDescription(income.operatingExpense)}。`);
        if (income.operatingExpense && income.totalRevenue) {
            const rate = income.operatingExpense / income.totalRevenue;
            logs.push(`计算费用率（营业费用/收入）：${formatNumber(income.operatingExpense)} / ${formatNumber(income.totalRevenue)} = ${formatPercent(rate)}。`);
        }

        logs.push(`读取研发费用：research_and_development=${formatCurrencyWithCNDescription(income.researchAndDevelopment)}。`);
        if (income.researchAndDevelopment && income.totalRevenue) {
            const rate = income.researchAndDevelopment / income.totalRevenue;
            logs.push(`计算研发费率：${formatNumber(income.researchAndDevelopment)} / ${formatNumber(income.totalRevenue)} = ${formatPercent(rate)}。`);
        }

        // Note: sellingGeneralAndAdministration might need to be calculated or fetched if available. 
        // Types indicate 'sellingGeneralAndAdministration' exists.
        logs.push(`读取销售管理费用：selling_general_and_administration=${formatCurrencyWithCNDescription(income.sellingGeneralAndAdministration)}。`);
        if (income.sellingGeneralAndAdministration && income.totalRevenue) {
            const rate = income.sellingGeneralAndAdministration / income.totalRevenue;
            logs.push(`计算SG&A费率：${formatNumber(income.sellingGeneralAndAdministration)} / ${formatNumber(income.totalRevenue)} = ${formatPercent(rate)}。`);
        }

        logs.push(`读取营业利润：operating_income=${formatCurrencyWithCNDescription(income.operatingIncome)}。`);
        if (income.operatingIncome && income.totalRevenue) {
            const rate = income.operatingIncome / income.totalRevenue;
            logs.push(`计算营业利润率：${formatNumber(income.operatingIncome)} / ${formatNumber(income.totalRevenue)} = ${formatPercent(rate)}。`);
        }

        // otherNonOperatingIncomeExpenses -> other_income_expense
        logs.push(`读取其他收入/费用：other_income_expense=${formatCurrencyWithCNDescription(income.otherNonOperatingIncomeExpenses)}。`);

        logs.push(`读取税前利润：pretax_income=${formatCurrencyWithCNDescription(income.pretaxIncome)}。`);
        logs.push(`读取所得税：tax_provision=${formatCurrencyWithCNDescription(income.taxProvision)}。`);

        if (income.taxProvision && income.pretaxIncome) {
            const rate = income.taxProvision / income.pretaxIncome;
            logs.push(`计算有效税率：tax_provision / pretax_income ≈ ${formatNumber(income.taxProvision)} / ${formatNumber(income.pretaxIncome)} = ${formatPercent(rate)}。`);
        }

        logs.push(`读取净利润：net_income=${formatCurrencyWithCNDescription(income.netIncome)}。`);
        if (income.netIncome && income.totalRevenue) {
            const rate = income.netIncome / income.totalRevenue;
            logs.push(`计算净利率：${formatNumber(income.netIncome)} / ${formatNumber(income.totalRevenue)} = ${formatPercent(rate)}。`);
        }

        // EBIT/EBITDA might not be directly in the item, let's check or calculate approximate.
        // Assuming they are available in the type definition if user script references them directly.
        // If not, we skip or calc. Let's assume they are there or we use close approximations.
        // Checking types.ts previously... I didn't see explicit ebit/ebitda in the grep. 
        // Let's use `operatingIncome` as proxy for EBIT if not found.
        // Actually, let's just use what we have. 
        // logs.push(`读取EBIT/EBITDA：ebit=${formatNumber(income.ebit)}；ebitda=${formatNumber(income.ebitda)}。`); // Commented out as I'm not sure if fields exist in `types.ts` snippet I saw.

        logs.push(`读取折旧摊销（对账口径）：reconciled_depreciation=${formatCurrencyWithCNDescription(income.reconciledDepreciation)}。`);

        // EPS
        logs.push(`每股收益：basic_eps=${income.basicEps}；diluted_eps=${income.dilutedEps}。`);
        logs.push(`股份数口径：basic_average_shares=${income.basicAverageShares?.toLocaleString()}；diluted_average_shares=${income.dilutedAverageShares?.toLocaleString()}。`);

        logs.push(`利润表结论（可展示）：毛利率约${income.grossProfit && income.totalRevenue ? formatPercent(income.grossProfit / income.totalRevenue) : 'N/A'}、营业利润率约${income.operatingIncome && income.totalRevenue ? formatPercent(income.operatingIncome / income.totalRevenue) : 'N/A'}、净利率约${income.netIncome && income.totalRevenue ? formatPercent(income.netIncome / income.totalRevenue) : 'N/A'}，盈利能力${(income.netIncome && income.netIncome > 0) ? '非常强' : '待改善'}。`);
    } else {
        logs.push("=== income_statement 利润表（数据缺失）===");
    }

    // === Balance Sheet ===
    if (balance) {
        logs.push(`=== balance_sheet 资产负债表（${balanceDate}）===`);
        logs.push(`读取总资产：total_assets=${formatCurrencyWithCNDescription(balance.totalAssets)}。`);
        logs.push(`读取总负债：total_liabilities_net_minority_interest=${formatCurrencyWithCNDescription(balance.totalLiabilitiesNetMinorityInterest)}。`);
        logs.push(`读取股东权益：stockholders_equity=${formatCurrencyWithCNDescription(balance.stockholdersEquity)}。`);

        if (balance.totalLiabilitiesNetMinorityInterest && balance.totalAssets) {
            const debtRatio = balance.totalLiabilitiesNetMinorityInterest / balance.totalAssets;
            const equityRatio = (balance.stockholdersEquity || 0) / balance.totalAssets;
            logs.push(`计算资产负债结构：负债/资产≈${formatPercent(debtRatio)}，权益/资产≈${formatPercent(equityRatio)}。`);
        }

        logs.push(`读取流动资产：current_assets=${formatCurrencyWithCNDescription(balance.currentAssets)}。`);
        logs.push(`读取流动负债：current_liabilities=${formatCurrencyWithCNDescription(balance.currentLiabilities)}。`);

        if (balance.currentAssets && balance.currentLiabilities) {
            const currentRatio = balance.currentAssets / balance.currentLiabilities;
            logs.push(`计算流动比率：${formatNumber(balance.currentAssets)} / ${formatNumber(balance.currentLiabilities)} ≈ ${currentRatio.toFixed(2)}（${currentRatio < 1 ? '<1：营运资金为负，需结合现金流与商业模式解读' : '>1：流动性良好'}）。`);
        }

        logs.push(`读取营运资金：working_capital=${formatCurrencyWithCNDescription(balance.workingCapital)}。`);
        logs.push(`读取现金及等价物：cash_and_cash_equivalents=${formatCurrencyWithCNDescription(balance.cashAndCashEquivalents)}。`);
        logs.push(`读取现金+短期投资：cash_cash_equivalents_and_short_term_investments=${formatCurrencyWithCNDescription(balance.cashCashEquivalentsAndShortTermInvestments)}。`);
        // logs.push(`读取短期投资：other_short_term_investments=${formatCurrencyWithCNDescription(balance.otherShortTermInvestments)}。`); 

        logs.push(`读取可供出售证券：available_for_sale_securities=${formatCurrencyWithCNDescription(balance.availableForSaleSecurities)}。`);
        logs.push(`读取应收：receivables=${formatCurrencyWithCNDescription(balance.receivables)}。`); // Simplified
        logs.push(`读取存货：inventory=${formatCurrencyWithCNDescription(balance.inventory)}。`);
        logs.push(`读取应付：accounts_payable=${formatCurrencyWithCNDescription(balance.accountsPayable)}。`);

        logs.push(`读取短期债务：current_debt=${formatCurrencyWithCNDescription(balance.currentDebt)}。`);
        logs.push(`读取长期债务：long_term_debt=${formatCurrencyWithCNDescription(balance.longTermDebt)}。`);
        logs.push(`读取总债务：total_debt=${formatCurrencyWithCNDescription(balance.totalDebt)}。`);
        logs.push(`读取净负债：net_debt=${formatCurrencyWithCNDescription(balance.netDebt)}。`);

        logs.push(`读取固定资产：net_ppe=${formatCurrencyWithCNDescription(balance.netPpe)}。`);
        logs.push(`读取普通股数：ordinary_shares_number=${balance.ordinarySharesNumber?.toLocaleString()}。`);
        logs.push(`读取留存收益：retained_earnings=${formatCurrencyWithCNDescription(balance.retainedEarnings)}。`);

        logs.push(`资产负债表结论（可展示）：现金与投资资产规模${(balance.cashCashEquivalentsAndShortTermInvestments || 0) > 1e10 ? '大' : '一般'}，同时债务也${(balance.totalDebt || 0) > 1e10 ? '大' : '较小'}；净负债约 ${formatNumber(balance.netDebt)}。`);
    } else {
        logs.push("=== balance_sheet 资产负债表（数据缺失）===");
    }

    // === Cash Flow ===
    if (cashflow) {
        logs.push(`=== cash_flow 现金流量表（${cashflowDate}）===`);
        logs.push(`读取期初现金：beginning_cash_position=${formatCurrencyWithCNDescription(cashflow.beginningCashPosition)}。`);
        logs.push(`读取期末现金：end_cash_position=${formatCurrencyWithCNDescription(cashflow.endCashPosition)}。`);
        logs.push(`读取现金净增加：changes_in_cash=${formatCurrencyWithCNDescription(cashflow.changesInCash)}。`);

        logs.push(`读取经营活动现金流：operating_cash_flow=${formatCurrencyWithCNDescription(cashflow.operatingCashFlow)}。`);
        logs.push(`读取投资活动现金流：investing_cash_flow=${formatCurrencyWithCNDescription(cashflow.investingCashFlow)}。`);
        logs.push(`读取筹资活动现金流：financing_cash_flow=${formatCurrencyWithCNDescription(cashflow.financingCashFlow)}。`);
        logs.push(`经营现金流解释：企业“能否持续产生现金”通常比利润更关键；此处经营现金流${(cashflow.operatingCashFlow || 0) > 0 ? '非常强' : '为负'}。`);

        logs.push(`读取自由现金流：free_cash_flow=${formatCurrencyWithCNDescription(cashflow.freeCashFlow)}。`);
        logs.push(`读取资本开支：capital_expenditure=${formatCurrencyWithCNDescription(cashflow.capitalExpenditure)}。`);

        // CapEx intensity
        if (cashflow.capitalExpenditure && income?.totalRevenue) {
            const intensity = Math.abs(cashflow.capitalExpenditure) / income.totalRevenue;
            logs.push(`计算CapEx强度：|CapEx|/Revenue≈${formatPercent(intensity)}。`);
        }

        logs.push(`读取折旧摊销：depreciation_amortization_depletion=${formatCurrencyWithCNDescription(cashflow.depreciationAmortizationDepletion)}。`);
        logs.push(`读取股权激励：stock_based_compensation=${formatCurrencyWithCNDescription(cashflow.stockBasedCompensation)}。`);

        logs.push(`读取税款支付：income_tax_paid_supplemental_data=${formatCurrencyWithCNDescription(cashflow.incomeTaxPaidSupplementalData)}。`);

        logs.push(`筹资活动拆解：回购 repurchase_of_capital_stock=${formatCurrencyWithCNDescription(cashflow.repurchaseOfCapitalStock)}。`);
        logs.push(`筹资活动拆解：分红 cash_dividends_paid=${formatCurrencyWithCNDescription(cashflow.cashDividendsPaid)}。`);
        logs.push(`筹资活动拆解：发行债务 issuance_of_debt=${formatCurrencyWithCNDescription(cashflow.issuanceOfDebt)}。`);
        logs.push(`筹资活动拆解：偿还债务 repayment_of_debt=${formatCurrencyWithCNDescription(cashflow.repaymentOfDebt)}。`);

        logs.push(`现金流结论（可展示）：经营现金流${(cashflow.operatingCashFlow || 0) > 0 ? '强劲' : '一般'} + 自由现金流${(cashflow.freeCashFlow || 0) > 0 ? '充沛' : '紧张'}。`);
    } else {
        logs.push("=== cash_flow 现金流量表（数据缺失）===");
    }

    // === Consistency Check ===
    logs.push("=== 三表口径一致性提醒（强烈建议展示给用户）===");
    if (cashflow && balance) {
        if (cashflow.endCashPosition === balance.cashAndCashEquivalents) {
            logs.push(`一致性1：现金流期末现金 ${formatNumber(cashflow.endCashPosition)} 与资产负债表现金 ${formatNumber(balance.cashAndCashEquivalents)} 完全一致（可靠性加分）。`);
        } else {
            logs.push(`一致性1：现金流期末现金 ${formatNumber(cashflow.endCashPosition)} 与资产负债表现金 ${formatNumber(balance.cashAndCashEquivalents)} 不一致。`);
        }

        const netDebtCalc = (balance.totalDebt || 0) - (balance.cashAndCashEquivalents || 0);
        if (balance.netDebt !== undefined && Math.abs(balance.netDebt - netDebtCalc) < 1e6) {
            logs.push(`一致性2：净负债 net_debt=${formatNumber(balance.netDebt)} 与 total_debt - cash 完全一致（口径自洽）。`);
        }
    }

    logs.push("=== 最后提示（必须展示）===");
    logs.push("核查提醒：以上内容基于你提供的公开/第三方数据自动计算与归纳，可能存在延迟、缺失或错误，请以交易所数据、公司公告与正式财报为准。");
    logs.push("免责声明：本内容仅供信息参考，不构成任何投资、交易或个性化理财建议；据此操作的决策与风险由用户自行承担。");

    return logs;
};

/**
 * Generate stock info logs based on base quota data.
 */
export const generateStockInfoLogs = (stockData?: AppStockBaseQuotaUsingGetResponse['data']): string[] => {
    if (!stockData) return ["=== Stock Info (Data Missing) ==="];

    const logs: string[] = [];
    const formatNum = (num: number | undefined) => num !== undefined ? num.toLocaleString() : 'null';
    const formatCurrency = (num: number | undefined) => num !== undefined ? num.toLocaleString() + ' ' + (stockData.currency || 'USD') : 'null';
    const formatPercentLocal = (num: number | undefined) => num !== undefined ? (num * 100).toFixed(2) + '%' : 'null';

    // Header
    logs.push(`开始解析股票快照数据：id=${stockData.id}，symbol=${stockData.symbol}，名称=${stockData.name}，计价货币=${stockData.currency}。`);

    // Exchange
    logs.push(`交易所：${stockData.exchange_acronym}（${stockData.exchange_name}），交易所时区=${stockData.exchange_timezone_name}。`);
    logs.push(`国家/地区：${stockData.country_region_code}。`);
    logs.push(`数据口径说明：此处为“快照数据”，可能同时包含盘前/盘中/盘后字段；不同字段的更新时间可能不一致。`);
    logs.push(`当前市场状态：market_state=${stockData.market_state}。`);

    // Price
    logs.push(`价格展示策略：盘前优先展示 pre_market_price，其次展示 current_price 作为最新参考。`);
    logs.push(`读取最新参考价：current_price=${formatCurrency(stockData.current_price)}。`);
    logs.push(`读取昨收价：previous_close=${formatCurrency(stockData.previous_close)}。`);

    if (stockData.current_price !== undefined && stockData.previous_close !== undefined) {
        const diff = stockData.current_price - stockData.previous_close;
        logs.push(`计算最新涨跌额：current_price - previous_close = ${stockData.current_price} - ${stockData.previous_close} = ${diff > 0 ? '+' : ''}${diff.toFixed(2)} ${stockData.currency}（字段 change_amount=${stockData.change_amount}）。`);
        const pct = diff / stockData.previous_close;
        logs.push(`计算最新涨跌幅：${(diff).toFixed(2)} / ${stockData.previous_close} ≈ ${(pct * 100).toFixed(3)}%（字段 change_percent=${stockData.change_percent}）。`);
    }

    // Pre-market
    if (stockData.pre_market_price) {
        logs.push(`读取盘前价：pre_market_price=${formatCurrency(stockData.pre_market_price)}。`);
        logs.push(`读取盘前涨跌额：pre_market_change=${stockData.pre_market_change}。`);
        logs.push(`读取盘前涨跌幅：pre_market_change_percent≈${formatPercentLocal(stockData.pre_market_change_percent)}。`);
        if (stockData.current_price && stockData.previous_close) {
            const preChange = stockData.pre_market_change_percent || 0;
            const currChange = stockData.change_percent || 0;
            logs.push(`盘前与最新价对照：盘前显示${preChange}，最新参考价为${currChange}。`);
        }
    }

    // Open & High/Low
    logs.push(`读取开盘价：open=${formatCurrency(stockData.open)}。`);
    if (stockData.current_price && stockData.open) {
        const diff = stockData.current_price - stockData.open;
        logs.push(`开盘到最新：current_price - open = ${diff.toFixed(3)} ${stockData.currency}。`);
    }

    logs.push(`读取当日最高：day_high=${formatCurrency(stockData.day_high)}。`);
    logs.push(`读取当日最低：day_low=${formatCurrency(stockData.day_low)}。`);

    if (stockData.day_high && stockData.day_low) {
        const amplitude = stockData.day_high - stockData.day_low;
        logs.push(`计算日内振幅（区间）：day_high - day_low = ${amplitude.toFixed(4)} ${stockData.currency}。`);
        if (stockData.previous_close) {
            logs.push(`计算相对昨收振幅：${amplitude.toFixed(4)} / ${stockData.previous_close} ≈ ${((amplitude / stockData.previous_close) * 100).toFixed(4)}%（字段 amplitude=${stockData.amplitude}）。`);
        }
        if (stockData.current_price) {
            const fromHigh = stockData.day_high - stockData.current_price;
            const fromLow = stockData.current_price - stockData.day_low;
            const pos = (stockData.current_price - stockData.day_low) / (stockData.day_high - stockData.day_low);
            logs.push(`计算距日高差值：${fromHigh.toFixed(2)}；距日低差值：${fromLow.toFixed(2)}。`);
            logs.push(`计算当前在日内区间位置：≈ ${(pos * 100).toFixed(2)}%（越接近日高，短线越偏强）。`);
        }
    }

    // Average Price & Volume
    logs.push(`读取均价字段：average_price=${stockData.average_price}。`);
    if (stockData.current_price && stockData.average_price) {
        const diff = stockData.current_price - stockData.average_price;
        logs.push(`对比最新价与均价：${diff > 0 ? '+' : ''}${diff.toFixed(4)}（${diff > 0 ? '高于均价' : '低于均价'}）。`);
    }

    logs.push(`读取成交量：volume=${formatNum(stockData.volume)}。`);
    logs.push(`读取成交额：turnover=${formatCurrency(stockData.turnover)}。`);
    if (stockData.turnover && stockData.volume) {
        const avgPrice = stockData.turnover / stockData.volume;
        logs.push(`一致性检查：turnover / volume ≈ ${avgPrice.toFixed(2)}，${stockData.current_price && Math.abs(avgPrice - stockData.current_price) < 1 ? '接近当前价' : '与当前价有偏差'}。`);
    }

    logs.push(`读取换手率：turnover_rate=${stockData.turnover_rate}。`);
    logs.push(`读取量比：volume_ratio=${stockData.volume_ratio}。`);
    logs.push(`读取买卖盘比：bid_ask_ratio=${stockData.bid_ask_ratio}。`);

    // Market Cap
    logs.push(`读取总市值：market_cap=${formatCurrencyWithCNDescription(stockData.market_cap)}。`);
    logs.push(`读取流通市值：float_market_cap=${formatCurrencyWithCNDescription(stockData.float_market_cap)}。`);
    logs.push(`读取总股本：shares_outstanding=${formatNum(stockData.shares_outstanding)}。`);
    logs.push(`读取流通股本：float_shares=${formatNum(stockData.float_shares)}。`);

    if (stockData.float_shares && stockData.shares_outstanding && stockData.float_shares > stockData.shares_outstanding) {
        logs.push(`一致性提示：float_shares（流通股）大于 shares_outstanding（总股本）不常见，可能是数据源口径/更新时间不一致；展示时建议标注“数据口径以数据源为准”。`);
    }

    logs.push(`读取推算总股本：implied_shares_outstanding=${formatNum(stockData.implied_shares_outstanding)}。`);

    if (stockData.float_market_cap && stockData.float_shares) {
        const price = stockData.float_market_cap / stockData.float_shares;
        logs.push(`用流通口径反推价格：float_market_cap / float_shares ≈ ${price.toFixed(2)}。`);
    }
    if (stockData.market_cap && stockData.shares_outstanding) {
        const price = stockData.market_cap / stockData.shares_outstanding;
        logs.push(`用总市值口径反推价格：market_cap / shares_outstanding ≈ ${price.toFixed(2)}。`);
    }

    // 52 Week & History
    logs.push(`读取 52 周最高：fifty_two_week_high=${formatCurrency(stockData.fifty_two_week_high)}。`);
    logs.push(`读取 52 周最低：fifty_two_week_low=${formatCurrency(stockData.fifty_two_week_low)}。`);
    logs.push(`读取 52 周区间字符串：fifty_two_week_range='${stockData.fifty_two_week_range}'。`);

    if (stockData.current_price && stockData.fifty_two_week_high && stockData.fifty_two_week_low) {
        const range = stockData.fifty_two_week_high - stockData.fifty_two_week_low;
        const pos = (stockData.current_price - stockData.fifty_two_week_low) / range;
        logs.push(`计算当前在 52 周区间位置：≈ ${(pos * 100).toFixed(2)}%（${pos > 0.5 ? '更靠近 52 周高位' : '更靠近 52 周低位'}）。`);
    }

    logs.push(`读取历史最高：all_time_high=${formatCurrency(stockData.all_time_high)}。`);
    logs.push(`读取历史最低：all_time_low=${formatCurrency(stockData.all_time_low)}。`);

    // Valuation
    logs.push(`读取市盈率TTM：pe_ttm=${stockData.pe_ttm}。`);
    logs.push(`读取静态市盈率：pe_static=${stockData.pe_static}。`);
    logs.push(`读取预测市盈率：pe_forward=${stockData.pe_forward}。`);
    logs.push(`读取市净率PB：pb_ratio=${stockData.pb_ratio}。`);
    logs.push(`读取EPS(TTM)：eps_ttm=${stockData.eps_ttm}。`);
    logs.push(`读取EPS(Forward)：eps_forward=${stockData.eps_forward}。`);
    logs.push(`读取每股净资产：book_value=${stockData.book_value}。`);
    logs.push(`估值直观解读：PE 越高通常意味着“市场对未来增长预期更高或当前估值更贵”。`);

    if (stockData.pe_ttm) {
        logs.push(`计算盈利收益率近似：1 / pe_ttm ≈ ${(100 / stockData.pe_ttm).toFixed(2)}%。`);
    }

    // Dividend
    logs.push(`读取股息：dividend_rate=${stockData.dividend_rate}。`);
    logs.push(`读取股息率：dividend_yield=${stockData.dividend_yield}。`);
    logs.push(`如采用“百分比口径”：${formatPercentLocal(stockData.dividend_yield)}。`);

    // Technicals
    logs.push(`读取 Beta：beta=${stockData.beta}。`);
    logs.push(`读取 10 日均量：average_volume_10days=${formatNum(stockData.average_volume_10days)}。`);
    logs.push(`读取 50 日均线：fifty_day_average=${stockData.fifty_day_average}。`);
    logs.push(`读取 200 日均线：two_hundred_day_average=${stockData.two_hundred_day_average}。`);

    if (stockData.current_price && stockData.fifty_day_average && stockData.two_hundred_day_average) {
        const diff50 = (stockData.current_price - stockData.fifty_day_average) / stockData.fifty_day_average;
        logs.push(`计算相对 50 日均线偏离：${(diff50 * 100).toFixed(2)}%（字段 fifty_day_average_change_percent=${stockData.fifty_day_average_change_percent}）。`);

        logs.push(`趋势形态提示：价格${stockData.current_price > stockData.fifty_day_average ? '高于' : '低于'} 50MA，${stockData.current_price > stockData.two_hundred_day_average ? '高于' : '低于'} 200MA。`);
    }

    // Returns
    logs.push(`读取 YTD 回报：year_to_date_return=${formatPercentLocal(stockData.year_to_date_return)}。`);
    logs.push(`读取 3 个月回报：three_month_return=${formatPercentLocal(stockData.three_month_return)}。`);
    logs.push(`读取 6 个月回报：six_month_return=${formatPercentLocal(stockData.six_month_return)}。`);
    logs.push(`读取 1 年回报：one_year_return=${formatPercentLocal(stockData.one_year_return)}。`);
    logs.push(`读取 3 年回报：three_year_return=${formatPercentLocal(stockData.three_year_return)}。`);
    logs.push(`读取 5 年回报：five_year_return=${formatPercentLocal(stockData.five_year_return)}。`);
    logs.push(`读取 标普52周变化对照：sand_p_52_week_change=${formatPercentLocal(stockData.sand_p_52_week_change)}。`);

    // Fundamental Ratios
    logs.push(`读取 营收/盈利相关：revenue_per_share=${stockData.revenue_per_share}；revenue_growth=${formatPercentLocal(stockData.revenue_growth)}。`);
    logs.push(`读取 净利润：net_income_to_common=${formatCurrencyWithCNDescription(stockData.net_income_to_common)}。`);
    logs.push(`读取 盈利增长：earnings_growth=${formatPercentLocal(stockData.earnings_growth)}。`);
    logs.push(`读取 季度盈利增长：earnings_quarterly_growth=${formatPercentLocal(stockData.earnings_quarterly_growth)}。`);
    logs.push(`读取 EBITDA：ebitda=${formatCurrencyWithCNDescription(stockData.ebitda)}。`);
    logs.push(`读取 企业估值倍数：enterprise_to_revenue=${stockData.enterprise_to_revenue}；enterprise_to_ebitda=${stockData.enterprise_to_ebitda}。`);

    logs.push(`读取 ROA：return_on_assets=${formatPercentLocal(stockData.return_on_assets)}。`);
    logs.push(`读取 ROE：return_on_equity=${formatPercentLocal(stockData.return_on_equity)}。`);

    logs.push(`读取 自由现金流：free_cashflow=${formatCurrencyWithCNDescription(stockData.free_cashflow)}。`);
    logs.push(`读取 经营现金流：operating_cashflow=${formatCurrencyWithCNDescription(stockData.operating_cashflow)}。`);

    logs.push(`读取 现金：total_cash=${formatCurrencyWithCNDescription(stockData.total_cash)}。`);
    logs.push(`读取 每股现金：total_cash_per_share=${stockData.total_cash_per_share}。`);
    logs.push(`读取 总负债：total_debt=${formatCurrencyWithCNDescription(stockData.total_debt)}。`);

    if (stockData.total_cash && stockData.total_debt) {
        const netCash = stockData.total_cash - stockData.total_debt;
        logs.push(`计算 净现金/净负债：${formatNum(netCash)}（${netCash > 0 ? '净现金' : '净负债'}）。`);
    }
    logs.push(`读取 债务权益比：debt_to_equity=${stockData.debt_to_equity}。`);
    logs.push(`读取 trailing_eps：trailing_eps=${stockData.trailing_eps}。`);

    // Holders & Shorts
    logs.push(`读取 筹码结构：held_percent_insiders=${formatPercentLocal(stockData.held_percent_insiders)}；held_percent_institutions=${formatPercentLocal(stockData.held_percent_institutions)}。`);

    logs.push(`读取 空头股数：shares_short=${formatNum(stockData.shares_short)}。`);
    logs.push(`读取 上月空头：shares_short_prior_month=${formatNum(stockData.shares_short_prior_month)}。`);
    logs.push(`计算 空头占总股本：shares_percent_shares_out=${formatPercentLocal(stockData.shares_percent_shares_out)}。`);
    logs.push(`计算 空头占流通股：short_percent_of_float=${formatPercentLocal(stockData.short_percent_of_float)}。`);
    logs.push(`读取 空头回补天数：short_ratio=${stockData.short_ratio}。`);

    // Company Profile
    logs.push(`读取 公司分类：sector=${stockData.sector}；industry=${stockData.industry}。`);
    logs.push(`读取 公司地址：${stockData.address_line_1}, ${stockData.city}, ${stockData.state || ''} ${stockData.zip}。`);
    logs.push(`读取 公司员工数：full_time_employees=${formatNum(stockData.full_time_employees)}。`);
    logs.push(`读取 公司官网：${stockData.website}。`);

    if (stockData.ceo_info) {
        logs.push(`读取 CEO 信息：${stockData.ceo_info.name}，age=${stockData.ceo_info.age}，total_pay=${formatCurrency(stockData.ceo_info.total_pay)}。`);
    }

    logs.push(`核查提醒：盘前/盘后字段可能为空或延迟，属正常情况，前端需做空值兜底。`);
    logs.push("重要提示：以上为基于公开/第三方数据的自动归纳与计算，可能存在延迟或错误，请以交易所数据与公司公告为准。");

    return logs;
};

/**
 * Generate peer comparison logs based on base quota and related info.
 */
export const generatePeerComparisonLogs = (
    stockData?: AppStockBaseQuotaUsingGetResponse['data'],
    relatedData?: AppStockRelatedInfoUsingGetResponse['data']
): string[] => {
    if (!stockData || !relatedData) return ["=== 同行/对比股票（数据缺失）==="];

    const logs: string[] = [];

    logs.push("=== 同行/对比股票（Peers & Compare）解读过程 ===");
    logs.push("说明：提供了两组列表：compare_to_stock_list（同行/可比公司）与 people_also_watch_stock_list（用户也关注/相关热度）。");
    logs.push(`目标：把 ${stockData.symbol} 放在“同组对照”里，给用户一个直观的相对位置。`);

    // 1) Read & Group
    const compareList = relatedData.compare_to_stock_list || [];
    const watchList = relatedData.people_also_watch_stock_list || [];

    logs.push("=== 1) 数据读取与分组 ===");
    logs.push(`读取 compare_to_stock_list：共 ${compareList.length} 只（${compareList.map(s => s.symbol).join(' / ')}）。`);
    logs.push(`读取 people_also_watch_stock_list：共 ${watchList.length} 只（${watchList.map(s => s.symbol).join(' / ')}）。`);
    logs.push("分组解释：同行组用于“业务/行业/产品形态”的对比；也关注组用于“资金关注/大盘科技权重/相关主题”的对比。");

    // 2) Currency & Timezone Check
    logs.push("=== 2) 口径与可比性检查（必须做）===");
    const currencies = new Set([stockData.currency, ...compareList.map(s => s.currency), ...watchList.map(s => s.currency)].filter(Boolean));
    logs.push(`检查币种：涉及币种 ${Array.from(currencies).join(', ')}。`);

    if (currencies.size > 1) {
        logs.push(`提示：不同币种的“价格水平”不可直接比较，但“涨跌幅/回报率”是可比的（百分比无币种）。`);
    } else {
        logs.push("提示：所有标的币种一致，价格具可比性。");
    }

    const timezones = new Set([
        stockData.exchange_timezone_name,
        ...compareList.map(s => s.exchange_timezone_name),
        ...watchList.map(s => s.exchange_timezone_name)
    ].filter(Boolean));

    if (timezones.size > 1) {
        logs.push(`检查时区：涉及多个时区 ${Array.from(timezones).join(', ')}。`);
        logs.push("提示：不同市场的交易时段不同，若同屏展示“当前价/日内高低”，要避免把不同市场的行情当成同一时间点的同步行情。");
    }

    logs.push("结论：跨市场对比时，核心使用“涨跌幅、YTD、3M/6M/1Y/3Y/5Y回报”等百分比指标。");

    // Helper for formatting percent
    const fmtPct = (val?: number) => val !== undefined ? (val * 100).toFixed(2) + '%' : 'N/A';

    // 3) Today's Performance
    logs.push("=== 3) 今日表现对比（涨跌幅/日内）===");

    // Combine all stocks for ranking
    const allStocks = [
        { ...stockData, type: 'MAIN', symbol: stockData.symbol },
        ...compareList.map(s => ({ ...s, type: 'COMPARE' })),
        ...watchList.map(s => ({ ...s, type: 'WATCH' }))
    ];

    // Filter unique by symbol
    const uniqueStocksMap = new Map();
    allStocks.forEach(s => {
        if (s.symbol && !uniqueStocksMap.has(s.symbol)) {
            uniqueStocksMap.set(s.symbol, s);
        }
    });
    const uniqueStocks = Array.from(uniqueStocksMap.values());

    // Sort by change_percent descending
    const sortedByChange = [...uniqueStocks].sort((a, b) => (b.change_percent || 0) - (a.change_percent || 0));

    logs.push("从同行组读取今日涨跌：");
    compareList.forEach(s => logs.push(`${s.symbol}：change_percent≈${fmtPct(s.change_percent)}。`));

    logs.push("从也关注组读取今日涨跌：");
    watchList.forEach(s => logs.push(`${s.symbol}：change_percent≈${fmtPct(s.change_percent)}。`));

    logs.push("对比提示：用户最关心的通常是“谁涨得最猛/谁最弱”。按今日涨跌幅粗排：");
    const todayRankStr = sortedByChange.map(s => `${s.symbol}（${fmtPct(s.change_percent)}）`).join(' > ');
    logs.push(`今日强弱：${todayRankStr}。`);

    // 4) Returns Comparison
    logs.push("=== 4) 回报率对比（YTD / 3M / 6M / 1Y / 3Y / 5Y）===");
    logs.push("说明：回报率是跨市场最公平的对比维度（百分比）。");

    // Helper to get returns text line for a stock
    const getReturnsText = (s: any) =>
        `${s.symbol}：YTD≈${fmtPct(s.year_to_date_return)}；3M≈${fmtPct(s.three_month_return)}；` +
        `6M≈${fmtPct(s.six_month_return)}；1Y≈${fmtPct(s.one_year_return)}；` +
        `3Y≈${fmtPct(s.three_year_return)}；5Y≈${fmtPct(s.five_year_return)}。`;

    logs.push("同行组回报读取：");
    compareList.forEach(s => logs.push(getReturnsText(s)));

    logs.push("也关注组回报读取：");
    watchList.forEach(s => logs.push(getReturnsText(s)));

    // 5) User Understandable Conclusions
    logs.push("=== 5) 把回报率翻译成“用户能懂”的结论 ===");

    const periods = [
        { key: 'three_month_return', label: '短期（3个月）' },
        { key: 'six_month_return', label: '中期（6个月）' },
        { key: 'one_year_return', label: '一年（1Y）' },
        { key: 'three_year_return', label: '三年（3Y）' },
        { key: 'five_year_return', label: '五年（5Y）' },
    ];

    periods.forEach(p => {
        const sorted = [...uniqueStocks].sort((a, b) => ((b as any)[p.key] || 0) - ((a as any)[p.key] || 0));
        const top = sorted[0];
        const bottom = sorted[sorted.length - 1];
        const mainRank = sorted.findIndex(s => s.symbol === stockData.symbol) + 1;

        logs.push(`${p.label}谁强：${top.symbol}（${fmtPct((top as any)[p.key])}）领跑；` +
            `${stockData.symbol} 排第 ${mainRank}/${sorted.length}（${fmtPct((stockData as any)[p.key])}）；` +
            `${bottom.symbol}（${fmtPct((bottom as any)[p.key])}）最弱。`);
    });

    const gproLike = uniqueStocks.find(s => {
        const m6 = s.six_month_return || 0;
        const y5 = s.five_year_return || 0;
        return m6 > 0.3 && y5 < -0.3;
    });

    if (gproLike) {
        logs.push(`风险提示：${gproLike.symbol} 出现“短期大涨但长期大跌”的形态，常见于高波动、小盘、周期性或事件驱动型标的；对用户应提示波动与回撤风险。`);
    }

    // 7) Main Stock Summary (AAPL)
    logs.push(`=== 7) ${stockData.symbol} 相对位置总结 ===`);

    // Sort all by 1Y for a general sense
    const sorted1Y = [...uniqueStocks].sort((a, b) => (b.one_year_return || 0) - (a.one_year_return || 0));
    const rank1Y = sorted1Y.findIndex(s => s.symbol === stockData.symbol);
    const percentile = (1 - rank1Y / uniqueStocks.length) * 100;

    let performanceDesc = "表现一般";
    if (percentile > 80) performanceDesc = "处于领先梯队";
    else if (percentile > 40) performanceDesc = "处于中游水平";
    else performanceDesc = "处于落后位置";

    logs.push(`总结：${stockData.symbol} 在本组对比中（基于1年回报）${performanceDesc}（排名 ${rank1Y + 1}/${uniqueStocks.length}）。`);

    const diffToLeader = (sorted1Y[0].one_year_return || 0) - (stockData.one_year_return || 0);
    if (diffToLeader > 0.2) {
        logs.push(`差距提示：与领跑者 ${sorted1Y[0].symbol} 的1年回报差距为 ${(diffToLeader * 100).toFixed(2)}%，驱动可能来自行业赛道、AI受益程度或估值变化。`);
    }

    // 8) Consistency Checks
    logs.push("=== 8) 口径一致性提醒（必须展示）===");
    logs.push("提醒1：people_also_watch 并不等于同行（它更像“用户共同关注”或“同属大科技权重”）。");
    logs.push("提醒2：不同市场交易时段不同，同屏对比日内高低/开盘价要避免“时点错位”。");
    if (stockData.year_to_date_trading_date_range) {
        logs.push(`提醒3：回报率基于各交易所交易日计算，当前参考区间：${stockData.year_to_date_trading_date_range}。`);
    }
    logs.push("提醒4：本对比仅基于价格回报，不包含基本面（利润、现金流、估值）差异。");

    logs.push("=== 最后提示（必须展示）===");
    logs.push("核查提醒：以上对比基于公开/第三方数据自动归纳，可能存在延迟、缺失或口径差异，请以交易所数据与公司公告为准。");
    logs.push("免责声明：本内容仅供信息参考，不构成任何投资、交易或个性化理财建议；据此操作的决策与风险由用户自行承担。");

    return logs;
};
