import { request } from './request';
import { StockFinancialDataAggregationResponse } from '../types/financial';
import { StockBaseDataResponse, StockRelatedResponse } from '../types/stock';
import { InvestingTranslationResponse } from '../types/investing';

/**
 * 获取股票聚合财务数据
 * @param symbol 股票代码
 * @returns Promise<StockFinancialDataAggregationResponse>
 */
export const fetchFinancialData = (symbol: string, exchange: string): Promise<StockFinancialDataAggregationResponse> => {
    return request<StockFinancialDataAggregationResponse>('/api/v1/ai_help/stock_financial_data_aggregation', {
        method: 'POST',
        data: {
            stock_symbol: symbol,
            exchange_acronym: exchange
        }
    });
};

/**
 * 批量获取股票基础数据
 */
export const fetchStockBaseData = (stockList: { stock_symbol: string, exchange_acronym: string }[]): Promise<StockBaseDataResponse> => {
    return request<StockBaseDataResponse>('/api/v1/yahoo/batch/get_stock_base_data', {
        method: 'POST',
        data: {
            is_return_history: false,
            stock_list: stockList
        }
    });
}

/**
 * 获取翻译数据
 */
export const fetchTranslations = (keyword: string): Promise<InvestingTranslationResponse> => {
    return request<InvestingTranslationResponse>('/api/v1/investing/translations', {
        method: 'POST',
        data: {
            keyword,
            language_code: 'zh_CN'
        }
    });
}

/**
 * 获取相关股票
 */
export const fetchRelatedStocks = (symbol: string, exchange: string): Promise<StockRelatedResponse> => {
    return request<StockRelatedResponse>('/api/v1/yahoo/yahoo_stock_related', {
        method: 'POST',
        data: {
            stock_symbol: symbol,
            exchange_acronym: exchange
        }
    });
}
