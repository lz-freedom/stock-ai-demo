/* eslint-disable */
// @ts-ignore

export type AppStockBaseQuotaUsingGetParams = {
  /** 股票代码 */
  symbol: string;
  /** 交易所品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym: string;
  /** 是否返回历史数据, 用于绘制K线 */
  is_return_history?: 0 | 1;
};

export type AppStockBaseQuotaUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** id */
    id?: number;
    /** 股票代码 */
    symbol?: string;
    /** svg logo链接 */
    svg_logo_url?: string;
    /** 股票名称 */
    name?: string;
    /** 股票描述 */
    description?: string;
    /** 品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
    exchange_acronym?: string;
    /** 交易所名称 */
    exchange_name?: string;
    /** 交易所时区 */
    exchange_timezone_name?: string;
    /** 交易所svg logo链接 */
    exchange_svg_logo_url?: string;
    /** 国家/地区两字码 */
    country_region_code?: string;
    /** 国家/地区svg logo链接 */
    country_region_svg_logo_url?: string;
    /** 货币类型 */
    currency?: string;
    /** 市场状态(PRE/REGULAR/POST) */
    market_state?: string;
    /** 交易所时区缩写(EST/EDT等) */
    exchange_timezone_short_name?: string;
    /** 交易所相对UTC的时区偏移(毫秒，如-18000000) */
    gmt_offset_ms?: number;
    /** 当前价格 */
    current_price?: number;
    /** 涨跌额 */
    change_amount?: number;
    /** 涨跌幅(小数，需前端x100) */
    change_percent?: number;
    /** 今开 */
    open?: number;
    /** 昨收 */
    previous_close?: number;
    /** 今日最高价 */
    day_high?: number;
    /** 今日最低价 */
    day_low?: number;
    /** 平均价, 暂时没有 */
    average_price?: number;
    /** 正常交易行情时间 */
    regular_market_time?: number;
    /** 盘前价格 */
    pre_market_price?: number;
    /** 盘前涨跌额 */
    pre_market_change?: number;
    /** 盘前涨跌幅 */
    pre_market_change_percent?: number;
    /** 盘前时间(Unix秒) */
    pre_market_time?: number;
    /** 盘后价格 */
    post_market_price?: number;
    /** 盘后涨跌额 */
    post_market_change?: number;
    /** 盘后涨跌幅 */
    post_market_percent?: number;
    /** 盘后时间(Unix秒) */
    post_market_time?: number;
    /** 成交量(股) */
    volume?: number;
    /** 成交额, 暂时没有 */
    turnover?: number;
    /** 换手率(需计算) */
    turnover_rate?: number;
    /** 总市值 */
    market_cap?: number;
    /** 流通值(需计算) */
    float_market_cap?: number;
    /** 总股本 */
    shares_outstanding?: number;
    /** 流通股 */
    float_shares?: number;
    /** 振幅(需计算) */
    amplitude?: number;
    /** 量比(需计算) */
    volume_ratio?: number;
    /** 委比(需计算)(不可用) */
    bid_ask_ratio?: number;
    /** 52周最高 */
    fifty_two_week_high?: number;
    /** 52周最低 */
    fifty_two_week_low?: number;
    /** 历史最高 */
    all_time_high?: number;
    /** 历史最低 */
    all_time_low?: number;
    /** 市盈率(TTM) */
    pe_ttm?: number;
    /** 市盈率(静) */
    pe_static?: number;
    /** 市盈率(动) */
    pe_forward?: number;
    /** 市净率 */
    pb_ratio?: number;
    /** 每股收益(TTM) */
    eps_ttm?: number;
    /** 每股收益(预测) */
    eps_forward?: number;
    /** 每股净资产 */
    book_value?: number;
    /** Beta系数 */
    beta?: number;
    /** 股息(TTM金额) */
    dividend_rate?: number;
    /** 股息率(TTM百分比) */
    dividend_yield?: number;
    /** 长业务总结 */
    long_business_summary?: string;
    /** 行业 */
    sector?: string;
    /** 业务摘要 */
    industry?: string;
    /** 国家 */
    country?: string;
    /** 州 */
    state?: string;
    /** 城市 */
    city?: string;
    /** 邮编 */
    zip?: string;
    /** 详细地址第一行 */
    address_line_1?: string;
    /** 详细地址第二行 */
    address_line_2?: string;
    /** 电话 */
    phone?: string;
    /** 全职员工数量 */
    full_time_employees?: number;
    /** 官网 */
    website?: string;
    /** 面向投资者的官网 */
    investor_relations_website?: string;
    /** CEO信息 */
    ceo_info?: CommonStockBaseDataResCompanyOfficer;
    /** 每股营收 */
    revenue_per_share?: number;
    /** 营收同比增长率 */
    revenue_growth?: number;
    /** 归母净利润 */
    net_income_to_common?: number;
    /** 盈利增长率 */
    earnings_growth?: number;
    /** 季度盈利增长 */
    earnings_quarterly_growth?: number;
    /** EBITDA */
    ebitda?: number;
    /** EV/Revenue */
    enterprise_to_revenue?: number;
    /** EV/EBITDA */
    enterprise_to_ebitda?: number;
    /** 净利润率 */
    profit_margin?: number;
    /** 毛利润率 */
    gross_margin?: number;
    /** EBITDA 利润率 */
    ebitda_margin?: number;
    /** 营业利润率 */
    operating_margin?: number;
    /** ROA */
    return_on_assets?: number;
    /** ROE */
    return_on_equity?: number;
    /** 自由现金流 */
    free_cashflow?: number;
    /** 经营现金流 */
    operating_cashflow?: number;
    /** 现金及等价物 */
    total_cash?: number;
    /** 每股现金 */
    total_cash_per_share?: number;
    /** 总负债 */
    total_debt?: number;
    /** 资产负债率 */
    debt_to_equity?: number;
    /** 静态每股收益（TTM） */
    trailing_eps?: number;
    /** 内部人持股比例 */
    held_percent_insiders?: number;
    /** 机构持股比例 */
    held_percent_institutions?: number;
    /** 当前卖空股数 */
    shares_short?: number;
    /** 上月卖空股数 */
    shares_short_prior_month?: number;
    /** 上月卖空统计时间 */
    shares_short_previous_month_date?: number;
    /** 卖空数据日期 */
    date_short_interest?: number;
    /** 卖空占总股本比例 */
    shares_percent_shares_out?: number;
    /** 空头回补天数 */
    short_ratio?: number;
    /** 卖空占流通股比例 */
    short_percent_of_float?: number;
    /** 推算流通股数 */
    implied_shares_outstanding?: number;
    /** 最近一次拆股比例 */
    last_split_factor?: string;
    /** 拆股日期 */
    last_split_date?: number;
    /** 10日平均成交量 */
    average_volume_10days?: number;
    /** 10日平均成交量 (重复) */
    average_daily_volume_10day?: number;
    /** 52 周价格区间 */
    fifty_two_week_range?: string;
    /** 52 周涨跌幅 */
    fifty_two_week_change_percent?: number;
    /** 标普 500 52 周涨跌幅 */
    sand_p_52_week_change?: number;
    /** 50日均线 */
    fifty_day_average?: number;
    /** 200日均线 */
    two_hundred_day_average?: number;
    /** 当前价 vs 50日均线 */
    fifty_day_average_change?: number;
    /** 与50日均线偏离率 */
    fifty_day_average_change_percent?: number;
    /** 当前价 vs 200日均线 */
    two_hundred_day_average_change?: number;
    /** 与 200 日均线偏离率 */
    two_hundred_day_average_change_percent?: number;
    /** 年初至今回报率 */
    year_to_date_return?: number;
    /** 年初至今交易日区间 */
    year_to_date_trading_date_range?: string;
    /** 近3个月回报率 */
    three_month_return?: number;
    /** 近3个月交易日区间 */
    three_month_trading_date_range?: string;
    /** 近6个月回报率 */
    six_month_return?: number;
    /** 近6个月交易日区间 */
    six_month_trading_date_range?: string;
    /** 近1年回报率 */
    one_year_return?: number;
    /** 近1年交易日区间 */
    one_year_trading_date_range?: string;
    /** 近3年回报率 */
    three_year_return?: number;
    /** 近3年交易日区间 */
    three_year_trading_date_range?: string;
    /** 近5年回报率 */
    five_year_return?: number;
    /** 近5年交易日区间 */
    five_year_trading_date_range?: string;
    /** 近5年历史日线 */
    history?: CommonStockBaseDataResStockHistoryItem[];
    /** 股票在第三方网站的访问地址 */
    third_party_website?: CommonStockThirdPartyWebsiteItem[];
  };
  error?: Interface;
};

export type AppStockBaseQuotaUsingGetResponses = {
  200: AppStockBaseQuotaUsingGetResponse;
};

export type AppStockBatchLatestPriceUsingGetParams = {
  /** 逗号拼接的股票id */
  ids: string;
};

export type AppStockBatchLatestPriceUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** 列表 */
    list?: StockLatestPriceResItem[];
  };
  error?: Interface;
};

export type AppStockBatchLatestPriceUsingGetResponses = {
  200: AppStockBatchLatestPriceUsingGetResponse;
};

export type AppStockHistoryDataUsingGetParams = {
  /** 股票代码 */
  symbol: string;
  /** 交易所品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym: string;
  /** 周期 1d、5d、1mo、3mo、6mo、1y、2y、5y、10y、ytd、max */
  period: string;
  /** 间隔 1m、2m、5m、15m、30m、60m、90m、1h、1d、5d、1wk、1mo、3mo */
  interval: string;
};

export type AppStockHistoryDataUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** 历史数据 */
    list?: CommonStockBaseDataResStockHistoryItem[];
  };
  error?: Interface;
};

export type AppStockHistoryDataUsingGetResponses = {
  200: AppStockHistoryDataUsingGetResponse;
};

export type AppStockLatestPriceUsingGetParams = {
  /** 股票id */
  id: number;
};

export type AppStockLatestPriceUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** id */
    id?: number;
    /** 交易所品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
    exchange_acronym?: string;
    /** 交易所时区 */
    exchange_timezone_name?: string;
    /** 交易所币种 */
    exchange_currency_code?: string;
    /** 股票编号 */
    symbol?: string;
    /** 最新价 */
    last_price?: number;
    /** 涨跌额 */
    change?: number;
    /** 涨跌幅 */
    change_percent?: number;
    /** 数据更新时间(Unix秒) */
    update_time?: number;
  };
  error?: Interface;
};

export type AppStockLatestPriceUsingGetResponses = {
  200: AppStockLatestPriceUsingGetResponse;
};

export type AppStockMostActiveListUsingGetParams = {
  /** 逗号拼接的国家ID */
  country_ids?: string;
};

export type AppStockMostActiveListUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** 股票列表 */
    list?: StockMostActiveResItem[];
  };
  error?: Interface;
};

export type AppStockMostActiveListUsingGetResponses = {
  200: AppStockMostActiveListUsingGetResponse;
};

export type AppStockMostActiveRegionGroupUsingGetParams = {
  /** 逗号拼接的国家/地区Code */
  country_region_ids?: string;
};

export type AppStockMostActiveRegionGroupUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** 分组列表 */
    group_list?: StockMostActiveRegionGroupResGroup[];
  };
  error?: Interface;
};

export type AppStockMostActiveRegionGroupUsingGetResponses = {
  200: AppStockMostActiveRegionGroupUsingGetResponse;
};

export type AppStockRelatedInfoUsingGetParams = {
  /** 股票代码 */
  symbol: string;
  /** 交易所品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym: string;
};

export type AppStockRelatedInfoUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** 对比的股票列表 */
    compare_to_stock_list?: StockRelatedInfoResStockItem[];
    /** 大家都在看的股票列表 */
    people_also_watch_stock_list?: StockRelatedInfoResStockItem[];
  };
  error?: Interface;
};

export type AppStockRelatedInfoUsingGetResponses = {
  200: AppStockRelatedInfoUsingGetResponse;
};

export type AppStockSearchUsingGetParams = {
  /** 关键词 */
  keyword: string;
};

export type AppStockSearchUsingGetResponse = {
  /** 状态码 */
  code?: string;
  /** 提示消息 */
  message?: string;
  /** 数据集 */
  data?: {
    /** 股票列表 */
    list?: StockSearchResItem[];
  };
  error?: Interface;
};

export type AppStockSearchUsingGetResponses = {
  200: AppStockSearchUsingGetResponse;
};

export type CommonStockBaseDataResCompanyOfficer = {
  /** 姓名 */
  name?: string;
  /** 年龄 */
  age?: number;
  /** 出生年份 */
  birth_year?: number;
  /** 总薪酬 */
  total_pay?: number;
};

export type CommonStockBaseDataResStockHistoryItem = {
  /** 原始时间 (ISO格式) */
  date_raw?: string;
  /** 交易所时区时间 */
  date?: string;
  /** 时间戳 */
  date_timestamp?: number;
  /** 开盘价 */
  open?: number;
  /** 最高价 */
  high?: number;
  /** 最低价 */
  low?: number;
  /** 收盘价 */
  close?: number;
  /** 调整后收盘价 */
  adj_close?: number;
  /** 成交量 */
  volume?: number;
};

export type CommonStockThirdPartyWebsiteItem = {
  /** 网站名称 */
  name?: string;
  /** 网站logo链接 */
  logo_url?: string;
  /** 网站链接 */
  stock_page_url?: string;
};

export type Interface = {};

export type StockLatestPriceResItem = {
  /** id */
  id?: number;
  /** 交易所品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym?: string;
  /** 交易所时区 */
  exchange_timezone_name?: string;
  /** 交易所币种 */
  exchange_currency_code?: string;
  /** 股票编号 */
  symbol?: string;
  /** 最新价 */
  last_price?: number;
  /** 涨跌额 */
  change?: number;
  /** 涨跌幅 */
  change_percent?: number;
  /** 数据更新时间(Unix秒) */
  update_time?: number;
};

export type StockMostActiveRegionGroupResGroup = {
  /** 国家/地区ID */
  country_region_id?: number;
  /** 国家/地区两字码 */
  country_region_code?: string;
  /** 国家/地区名称 */
  country_region_name?: string;
  /** 国家/地区svg logo链接 */
  country_region_svg_logo_url?: string;
  /** 股票列表 */
  list?: StockMostActiveRegionGroupResGroupStock[];
};

export type StockMostActiveRegionGroupResGroupStock = {
  /** 股票ID */
  id?: number;
  /** 股票代码 */
  symbol?: string;
  /** svg logo链接 */
  svg_logo_url?: string;
  /** 股票名称 */
  name?: string;
  /** 股票描述 */
  description?: string;
  /** 品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym?: string;
  /** 交易所名称 */
  exchange_name?: string;
  /** 交易所svg logo链接 */
  exchange_svg_logo_url?: string;
};

export type StockMostActiveResItem = {
  /** 股票ID */
  id?: number;
  /** 股票代码 */
  symbol?: string;
  /** svg logo链接 */
  svg_logo_url?: string;
  /** 股票名称 */
  name?: string;
  /** 股票描述 */
  description?: string;
  /** 品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym?: string;
  /** 交易所名称 */
  exchange_name?: string;
  /** 交易所svg logo链接 */
  exchange_svg_logo_url?: string;
  /** 国家/地区两字码 */
  country_region_code?: string;
  /** 国家/地区svg logo链接 */
  country_region_svg_logo_url?: string;
};

export type StockRelatedInfoResStockItem = {
  /** 股票ID */
  id?: number;
  /** 股票代码 */
  symbol?: string;
  /** svg logo链接 */
  svg_logo_url?: string;
  /** 股票名称 */
  name?: string;
  /** 品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym?: string;
  /** 交易所时区 */
  exchange_timezone_name?: string;
  /** 货币类型 */
  currency?: string;
  /** 交易所时区缩写(EST/EDT等) */
  exchange_timezone_short_name?: string;
  /** 交易所相对UTC的时区偏移(毫秒，如-18000000) */
  gmt_offset_ms?: number;
  /** 当前价格 */
  current_price?: number;
  /** 涨跌额 */
  change_amount?: number;
  /** 涨跌幅(小数，需前端x100) */
  change_percent?: number;
  /** 今开 */
  open?: number;
  /** 昨收 */
  previous_close?: number;
  /** 今日最高价 */
  day_high?: number;
  /** 今日最低价 */
  day_low?: number;
  /** 正常交易行情时间 */
  regular_market_time?: number;
  /** 年初至今回报率 */
  year_to_date_return?: number;
  /** 年初至今交易日区间 */
  year_to_date_trading_date_range?: string;
  /** 近3个月回报率 */
  three_month_return?: number;
  /** 近3个月交易日区间 */
  three_month_trading_date_range?: string;
  /** 近6个月回报率 */
  six_month_return?: number;
  /** 近6个月交易日区间 */
  six_month_trading_date_range?: string;
  /** 近1年回报率 */
  one_year_return?: number;
  /** 近1年交易日区间 */
  one_year_trading_date_range?: string;
  /** 近3年回报率 */
  three_year_return?: number;
  /** 近3年交易日区间 */
  three_year_trading_date_range?: string;
  /** 近5年回报率 */
  five_year_return?: number;
  /** 近5年交易日区间 */
  five_year_trading_date_range?: string;
};

export type StockSearchResItem = {
  /** 股票ID */
  id?: number;
  /** 股票代码 */
  symbol?: string;
  /** svg logo链接 */
  svg_logo_url?: string;
  /** 股票名称 */
  name?: string;
  /** 股票描述 */
  description?: string;
  /** 品牌名，NASDAQ、NYSE、SZSE、SSE、HKEX等 */
  exchange_acronym?: string;
  /** 交易所名称 */
  exchange_name?: string;
  /** 交易所svg logo链接 */
  exchange_svg_logo_url?: string;
  /** 国家/地区两字码 */
  country_region_code?: string;
  /** 国家/地区svg logo链接 */
  country_region_svg_logo_url?: string;
};
