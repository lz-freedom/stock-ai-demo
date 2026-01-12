/**
 * CEO 信息接口
 */
export interface CeoInfo {
    /** CEO 姓名 */
    name: string;
    /** CEO 年龄 */
    age: number;
    /** 出生年份 */
    birth_year: number;
    /** 总薪酬 (null表示未知) */
    total_pay: number | null;
}

/**
 * 股票基础数据对象接口
 */
export interface StockData {
    /** 股票代码 (例如: AAPL) */
    symbol: string;
    /** 交易所缩写 (例如: NASDAQ) */
    exchange_acronym: string;
    /** Yahoo 股票代码 (例如: AAPL) */
    yahoo_symbol: string;
    /** Yahoo 交易所代码 (例如: NMS) */
    yahoo_exchange: string;
    /** 公司名称 (例如: Apple) */
    name: string;
    /** 交易所时区名称 (例如: America/New_York) */
    exchange_timezone_name: string;
    /** 交易所时区简称 (例如: EST) */
    exchange_timezone_short_name: string;
    /** GMT 偏移量 (毫秒) */
    gmt_off_set_milliseconds: number;
    /** 货币代码 (例如: USD) */
    currency: string;
    /** 长篇业务摘要/公司简介 */
    long_business_summary: string;
    /** 行业板块 (例如: Technology) */
    sector: string;
    /** 所属行业 (例如: Consumer Electronics) */
    industry: string;
    /** 国家 (例如: United States) */
    country: string;
    /** 州/省 (可能为 null) */
    state: string | null;
    /** 城市 */
    city: string;
    /** 邮政编码 */
    zip: string;
    /** 地址第一行 */
    address_line_1: string;
    /** 地址第二行 (可能为 null) */
    address_line_2: string | null;
    /** 电话号码 */
    phone: string;
    /** 全职员工数量 */
    full_time_employees: number;
    /** 公司官网 */
    website: string;
    /** 投资者关系网站 (可能为 null) */
    investor_relations_website: string | null;
    /** CEO 信息对象 */
    ceo_info: CeoInfo;
    /** 市场状态 (例如: CLOSED, PREPRE, REGULAR) */
    market_state: string;
    /** 当前价格 */
    current_price: number;
    /** 昨日收盘价 */
    previous_close: number;
    /** 开盘价 */
    open: number;
    /** 当日最低价 */
    day_low: number;
    /** 当日最高价 */
    day_high: number;
    /** 成交量 */
    volume: number;
    /** 成交额 */
    turnover: number;
    /** 常规市场成交量 */
    regular_market_volume: number;
    /** 常规市场昨日收盘价 */
    regular_market_previous_close: number;
    /** 常规市场开盘价 */
    regular_market_open: number;
    /** 常规市场当日最低价 */
    regular_market_day_low: number;
    /** 常规市场当日最高价 */
    regular_market_day_high: number;
    /** 常规市场时间 (Unix 时间戳) */
    regular_market_time: number;
    /** 常规市场涨跌额 */
    regular_market_change_amount: number;
    /** 常规市场涨跌幅 (小数形式) */
    regular_market_change_percent: number;
    /** 买入价 */
    bid: number;
    /** 卖出价 */
    ask: number;
    /** 买入量 */
    bid_size: number;
    /** 卖出量 */
    ask_size: number;
    /** 市值 */
    market_cap: number;
    /** 企业价值 */
    enterprise_value: number;
    /** 贝塔系数 (波动率指标) */
    beta: number;
    /** 市盈率 (TTM - Trailing Twelve Months) (可能为 null) */
    pe_ttm: number | null;
    /** 静态市盈率 (可能为 null) */
    pe_static: number | null;
    /** 动态市盈率 (可能为 null) */
    pe_dynamic: number | null;
    /** 市销率 (TTM) */
    price_to_sales_trailing_12_months: number;
    /** 市净率 */
    price_to_book: number;
    /** 每股净资产 */
    book_value: number;
    /** 动态 PEG 比率 (可能为 null) */
    trailing_peg_ratio: number | null;
    /** 股息率 (金额) (可能为 null) */
    dividend_rate: number | null;
    /** 股息收益率 (小数形式) (可能为 null) */
    dividend_yield: number | null;
    /** 除息日 (Unix 时间戳) (可能为 null) */
    ex_dividend_date: number | null;
    /** 派息比率 */
    payout_ratio: number;
    /** 五年平均股息收益率 (可能为 null) */
    five_year_avg_dividend_yield: number | null;
    /** 最近一次股息金额 (可能为 null) */
    last_dividend_value: number | null;
    /** 最近一次股息日期 (Unix 时间戳) (可能为 null) */
    last_dividend_date: number | null;
    /** 年度股息率 (TTM) (可能为 null) */
    trailing_annual_dividend_rate: number | null;
    /** 年度股息收益率 (TTM) (可能为 null) */
    trailing_annual_dividend_yield: number | null;
    /** 股息 (TTM) (可能为 null) */
    dividend_ttm: number | null;
    /** 股息收益率 (TTM) (可能为 null) */
    dividend_yield_ttm: number | null;
    /** 总营收 */
    total_revenue: number;
    /** 每股营收 */
    revenue_per_share: number;
    /** 营收增长率 */
    revenue_growth: number;
    /** 归属于普通股股东的净利润 */
    net_income_to_common: number;
    /** 盈利增长率 (可能为 null) */
    earnings_growth: number | null;
    /** 季度盈利增长率 (可能为 null) */
    earnings_quarterly_growth: number | null;
    /** 息税折旧摊销前利润 (EBITDA) */
    ebitda: number;
    /** 企业价值/营收比 */
    enterprise_to_revenue: number;
    /** 企业价值/EBITDA 比 */
    enterprise_to_ebitda: number;
    /** 净利率 (可能为 null) */
    profit_margin: number | null;
    /** 毛利率 (可能为 null) */
    gross_margin: number | null;
    /** EBITDA 利润率 (可能为 null) */
    ebitda_margin: number | null;
    /** 营业利润率 (可能为 null) */
    operating_margin: number | null;
    /** 资产回报率 (ROA) */
    return_on_assets: number;
    /** 净资产收益率 (ROE) */
    return_on_equity: number;
    /** 自由现金流 */
    free_cashflow: number;
    /** 经营现金流 */
    operating_cashflow: number;
    /** 总现金 */
    total_cash: number;
    /** 每股总现金 */
    total_cash_per_share: number;
    /** 总债务 */
    total_debt: number;
    /** 债务权益比 */
    debt_to_equity: number;
    /** 每股收益 (Trailing EPS) */
    trailing_eps: number;
    /** 远期每股收益 (Forward EPS) */
    forward_eps: number;
    /** 每股收益 (TTM) */
    eps_trailing_twelve_months: number;
    /** 每股收益 (Forward) */
    eps_forward: number;
    /** 当前年度每股收益 (可能为 null) */
    eps_current_year: number | null;
    /** 当前年度市盈率 (可能为 null) */
    price_eps_current_year: number | null;
    /** 内部持股比例 */
    held_percent_insiders: number;
    /** 机构持股比例 */
    held_percent_institutions: number;
    /** 做空股数 (可能为 null) */
    shares_short: number | null;
    /** 上月做空股数 (可能为 null) */
    shares_short_prior_month: number | null;
    /** 上月做空参考日期 (Unix 时间戳) (可能为 null) */
    shares_short_previous_month_date: number | null;
    /** 做空数据日期 (Unix 时间戳) (可能为 null) */
    date_short_interest: number | null;
    /** 做空股数占流通股比例 (可能为 null) */
    shares_percent_shares_out: number | null;
    /** 做空比率 (Short Ratio) (可能为 null) */
    short_ratio: number | null;
    /** 做空股数占浮动股比例 (可能为 null) */
    short_percent_of_float: number | null;
    /** 浮动股数 */
    float_shares: number;
    /** 流通股数 */
    shares_outstanding: number;
    /** 隐含流通股数 */
    implied_shares_outstanding: number;
    /** 最近一次拆股比例 (例如: "4:1") */
    last_split_factor: string;
    /** 最近一次拆股日期 (Unix 时间戳) */
    last_split_date: number;
    /** 平均成交量 */
    average_volume: number;
    /** 10日平均成交量 */
    average_volume_10days: number;
    /** 10日日均成交量 */
    average_daily_volume_10day: number;
    /** 52周最低价 */
    fifty_two_week_low: number;
    /** 52周最高价 */
    fifty_two_week_high: number;
    /** 历史最高价 */
    all_time_high: number;
    /** 历史最低价 */
    all_time_low: number;
    /** 52周价格范围 (例如: "169.21 - 288.62") */
    fifty_two_week_range: string;
    /** 52周涨跌幅 (百分比) */
    fifty_two_week_change_percent: number;
    /** 标普500指数52周涨跌幅 */
    sand_p_52_week_change: number;
    /** 50日均线 */
    fifty_day_average: number;
    /** 200日均线 */
    two_hundred_day_average: number;
    /** 相对50日均线涨跌额 */
    fifty_day_average_change: number;
    /** 相对50日均线涨跌幅 */
    fifty_day_average_change_percent: number;
    /** 相对200日均线涨跌额 */
    two_hundred_day_average_change: number;
    /** 相对200日均线涨跌幅 */
    two_hundred_day_average_change_percent: number;
    /** 换手率 */
    turnover_rate: number;
    /** 成交额 (Turnover Value) */
    turnover_value: number;
    /** 振幅 */
    amplitude: number;
    /** 量比 */
    volume_ratio: number;
    /** 平均价格 */
    average_price: number;
    /** 盘前价格 (可能为 null) */
    pre_market_price: number | null;
    /** 盘前涨跌额 (可能为 null) */
    pre_market_change: number | null;
    /** 盘前涨跌幅 (可能为 null) */
    pre_market_change_percent: number | null;
    /** 盘前时间 (可能为 null) */
    pre_market_time: number | null;
    /** 盘后涨跌幅 (可能为 null) */
    post_market_change_percent: number | null;
    /** 盘后价格 (可能为 null) */
    post_market_price: number | null;
    /** 盘后涨跌额 (可能为 null) */
    post_market_change: number | null;
    /** 盘后时间 (可能为 null) */
    post_market_time: number | null;
    /** 年初至今收益率 (YTD) */
    year_to_date_return: number;
    /** 年初至今交易日期范围 */
    year_to_date_trading_date_range: string;
    /** 三个月收益率 */
    three_month_return: number;
    /** 三个月交易日期范围 */
    three_month_trading_date_range: string;
    /** 六个月收益率 */
    six_month_return: number;
    /** 六个月交易日期范围 */
    six_month_trading_date_range: string;
    /** 一年收益率 */
    one_year_return: number;
    /** 一年交易日期范围 */
    one_year_trading_date_range: string;
    /** 三年收益率 */
    three_year_return: number;
    /** 三年交易日期范围 */
    three_year_trading_date_range: string;
    /** 五年收益率 */
    five_year_return: number;
    /** 五年交易日期范围 */
    five_year_trading_date_range: string;
    /** 历史数据 (可能为 null, 详细结构待定义) */
    history: any | null;
}

/**
 * 股票基础数据 API 响应接口
 */
export interface StockBaseDataResponse {
    /** 响应状态码 (例如: "200000") */
    code: string;
    /** 响应消息 (例如: "success") */
    message: string;
    /** 股票数据列表 */
    data: StockData[];
}

/**
 * 相关股票项接口
 */
export interface StockRelatedItem {
  /** 股票代码 (例如: AMD) */
  stock_symbol: string;
  /** 交易所缩写 (例如: NASDAQ) */
  exchange_acronym: string;
  /** 公司名称 (例如: Advanced Micro Devices, Inc.) */
  name: string;
}

/**
 * 相关股票数据对象接口
 */
export interface StockRelatedData {
  /** 比较列表 */
  compare_to_list: StockRelatedItem[];
  /** 人们也关注列表 */
  people_also_watch_list: StockRelatedItem[];
}

/**
 * 股票相关数据 API 响应接口
 */
export interface StockRelatedResponse {
  /** 响应状态码 (例如: "200000") */
  code: string;
  /** 响应消息 (例如: "success") */
  message: string;
  /** 相关数据对象 */
  data: StockRelatedData;
}
