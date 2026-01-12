/**
 * 公司高管/董事信息接口
 */
export interface CompanyOfficer {
    /** 最大年龄 (可能是任期或其他指标) */
    maxage: number;
    /** 姓名 */
    name: string;
    /** 年龄 */
    age?: number;
    /** 职位/头衔 */
    title: string;
    /** 出生年份 */
    yearborn?: number;
    /** 财年 */
    fiscalyear: number;
    /** 总薪酬 */
    totalpay?: number;
    /** 行权价值 */
    exercisedvalue: number;
    /** 未行权价值 */
    unexercisedvalue: number;
}

/**
 * 股票详细信息接口 (Info)
 */
export interface StockFinancialInfo {
    /** 地址 1 */
    address1: string;
    /** 城市 */
    city: string;
    /** 州 */
    state: string;
    /** 邮编 */
    zip: string;
    /** 国家 */
    country: string;
    /** 电话 */
    phone: string;
    /** 官网 */
    website: string;
    /** 行业 */
    industry: string;
    /** 行业 Key */
    industrykey: string;
    /** 行业显示名称 */
    industrydisp: string;
    /** 板块 */
    sector: string;
    /** 板块 Key */
    sectorkey: string;
    /** 板块显示名称 */
    sectordisp: string;
    /** 详细业务摘要 */
    longbusinesssummary: string;
    /** 全职员工数 */
    fulltimeemployees: number;
    /** 公司高管列表 */
    companyofficers: CompanyOfficer[];
    /** 审计风险评分 */
    auditrisk: number;
    /** 董事会风险评分 */
    boardrisk: number;
    /** 薪酬风险评分 */
    compensationrisk: number;
    /** 股东权利风险评分 */
    shareholderrightsrisk: number;
    /** 整体风险评分 */
    overallrisk: number;
    /** 治理纪元日期 (Unix 时间戳) */
    governanceepochdate: number;
    /** 薪酬截至纪元日期 (Unix 时间戳) */
    compensationasofepochdate: number;
    /** 投资者关系网站 */
    irwebsite: string;
    /** 高管团队 (可能为空) */
    executiveteam: any[];
    /** 最大年龄限制 (?) */
    maxage: number;
    /** 价格精度提示 */
    pricehint: number;
    /** 昨日收盘价 */
    previousclose: number;
    /** 开盘价 */
    open: number;
    /** 当日最低价 */
    daylow: number;
    /** 当日最高价 */
    dayhigh: number;
    /** 常规市场昨日收盘价 */
    regularmarketpreviousclose: number;
    /** 常规市场开盘价 */
    regularmarketopen: number;
    /** 常规市场当日最低价 */
    regularmarketdaylow: number;
    /** 常规市场当日最高价 */
    regularmarketdayhigh: number;
    /** 股息率 (金额) */
    dividendrate: number;
    /** 股息收益率 */
    dividendyield: number;
    /** 除息日 */
    exdividenddate: number;
    /** 派息比率 */
    payoutratio: number;
    /** 五年平均股息收益率 */
    fiveyearavgdividendyield: number;
    /** 贝塔系数 */
    beta: number;
    /** 市盈率 (TTM) */
    trailingpe: number;
    /** 远期市盈率 */
    forwardpe: number;
    /** 成交量 */
    volume: number;
    /** 常规市场成交量 */
    regularmarketvolume: number;
    /** 平均成交量 */
    averagevolume: number;
    /** 10日平均成交量 */
    averagevolume10days: number;
    /** 10日日均成交量 */
    averagedailyvolume10day: number;
    /** 买入价 */
    bid: number;
    /** 卖出价 */
    ask: number;
    /** 买入量 */
    bidsize: number;
    /** 卖出量 */
    asksize: number;
    /** 市值 */
    marketcap: number;
    /** 52周最低价 */
    fiftytwoweeklow: number;
    /** 52周最高价 */
    fiftytwoweekhigh: number;
    /** 历史最高价 */
    alltimehigh: number;
    /** 历史最低价 */
    alltimelow: number;
    /** 市销率 (TTM) */
    pricetosalestrailing12months: number;
    /** 50日均线 */
    fiftydayaverage: number;
    /** 200日均线 */
    twohundreddayaverage: number;
    /** 年度股息率 (TTM) */
    trailingannualdividendrate: number;
    /** 年度股息收益率 (TTM) */
    trailingannualdividendyield: number;
    /** 货币 */
    currency: string;
    /** 是否可交易 */
    tradeable: boolean;
    /** 企业价值 */
    enterprisevalue: number;
    /** 净利率 */
    profitmargins: number;
    /** 浮动股数 */
    floatshares: number;
    /** 流通股数 */
    sharesoutstanding: number;
    /** 做空股数 */
    sharesshort: number;
    /** 上月做空股数 */
    sharesshortpriormonth: number;
    /** 上月做空参考日期 */
    sharesshortpreviousmonthdate: number;
    /** 做空数据日期 */
    dateshortinterest: number;
    /** 做空股数占流通股比例 */
    sharespercentsharesout: number;
    /** 内部持股比例 */
    heldpercentinsiders: number;
    /** 机构持股比例 */
    heldpercentinstitutions: number;
    /** 做空比率 */
    shortratio: number;
    /** 做空股数占浮动股比例 */
    shortpercentoffloat: number;
    /** 隐含流通股数 */
    impliedsharesoutstanding: number;
    /** 每股净资产 */
    bookvalue: number;
    /** 市净率 */
    pricetobook: number;
    /** 最近财年结束日期 (Unix 时间戳) */
    lastfiscalyearend: number;
    /** 下个财年结束日期 (Unix 时间戳) */
    nextfiscalyearend: number;
    /** 最近季度日期 (Unix 时间戳) */
    mostrecentquarter: number;
    /** 季度盈利增长率 */
    earningsquarterlygrowth: number;
    /** 归属于普通股股东的净利润 */
    netincometocommon: number;
    /** 每股收益 (Trailing) */
    trailingeps: number;
    /** 每股收益 (Forward) */
    forwardeps: number;
    /** 最近一次拆股比例 */
    lastsplitfactor: string;
    /** 最近一次拆股日期 (Unix 时间戳) */
    lastsplitdate: number;
    /** 企业价值/营收比 */
    enterprisetorevenue: number;
    /** 企业价值/EBITDA 比 */
    enterprisetoebitda: number;
    /** 52周涨跌幅 */
    "52weekchange": number;
    /** 标普500指数52周涨跌幅 */
    sandp52weekchange: number;
    /** 最近一次股息金额 */
    lastdividendvalue: number;
    /** 最近一次股息日期 (Unix 时间戳) */
    lastdividenddate: number;
    /** 报价类型 (例如 EQUITY) */
    quotetype: string;
    /** 当前价格 */
    currentprice: number;
    /** 目标最高价 */
    targethighprice: number;
    /** 目标最低价 */
    targetlowprice: number;
    /** 目标平均价 */
    targetmeanprice: number;
    /** 目标中位价 */
    targetmedianprice: number;
    /** 推荐均值 */
    recommendationmean: number;
    /** 推荐 Key (例如 strong_buy) */
    recommendationkey: string;
    /** 分析师意见数量 */
    numberofanalystopinions: number;
    /** 总现金 */
    totalcash: number;
    /** 每股总现金 */
    totalcashpershare: number;
    /** EBITDA */
    ebitda: number;
    /** 总债务 */
    totaldebt: number;
    /** 速动比率 */
    quickratio: number;
    /** 流动比率 */
    currentratio: number;
    /** 总营收 */
    totalrevenue: number;
    /** 债务权益比 */
    debttoequity: number;
    /** 每股营收 */
    revenuepershare: number;
    /** 资产回报率 */
    returnonassets: number;
    /** 净资产收益率 */
    returnonequity: number;
    /** 毛利润 */
    grossprofits: number;
    /** 自由现金流 */
    freecashflow: number;
    /** 经营现金流 */
    operatingcashflow: number;
    /** 盈利增长率 */
    earningsgrowth: number;
    /** 营收增长率 */
    revenuegrowth: number;
    /** 毛利率 */
    grossmargins: number;
    /** EBITDA 利润率 */
    ebitdamargins: number;
    /** 营业利润率 */
    operatingmargins: number;
    /** 财务货币 */
    financialcurrency: string;
    /** 股票代码 */
    symbol: string;
    /** 语言 */
    language: string;
    /** 地区 */
    region: string;
    /** 类型显示名称 */
    typedisp: string;
    /** 报价源名称 */
    quotesourcename: string;
    /** 是否可触发 */
    triggerable: boolean;
    /** 自定义价格提醒置信度 */
    custompricealertconfidence: string;
    /** 是否可加密交易 */
    cryptotradeable: boolean;
    /** 是否有盘前盘后数据 */
    hasprepostmarketdata: boolean;
    /** 首次交易日期 (毫秒) */
    firsttradedatemilliseconds: number;
    /** 企业行动 */
    corporateactions: any[];
    /** 盘后时间 (Unix 时间戳) */
    postmarkettime?: number;
    /** 常规市场时间 (Unix 时间戳) */
    regularmarkettime: number;
    /** 交易所 */
    exchange: string;
    /** 留言板 ID */
    messageboardid: string;
    /** 交易所时区名称 */
    exchangetimezonename: string;
    /** 交易所时区简称 */
    exchangetimezoneshortname: string;
    /** GMT 偏移量 (毫秒) */
    gmtoffsetmilliseconds: number;
    /** 市场 */
    market: string;
    /** ESG 数据是否填充 */
    esgpopulated: boolean;
    /** 简称 */
    shortname: string;
    /** 全称 */
    longname: string;
    /** 盘后涨跌幅 */
    postmarketchangepercent?: number;
    /** 盘后价格 */
    postmarketprice?: number;
    /** 盘后涨跌额 */
    postmarketchange?: number;
    /** 常规市场涨跌额 */
    regularmarketchange: number;
    /** 常规市场日价格范围 */
    regularmarketdayrange: string;
    /** 交易所全称 */
    fullexchangename: string;
    /** 3个月日均成交量 */
    averagedailyvolume3month: number;
    /** 52周最低价涨跌额 */
    fiftytwoweeklowchange: number;
    /** 52周最低价涨跌幅 */
    fiftytwoweeklowchangepercent: number;
    /** 52周价格范围 */
    fiftytwoweekrange: string;
    /** 52周最高价涨跌额 */
    fiftytwoweekhighchange: number;
    /** 52周最高价涨跌幅 */
    fiftytwoweekhighchangepercent: number;
    /** 52周涨跌幅 (百分比) */
    fiftytwoweekchangepercent: number;
    /** 股息日期 (Unix 时间戳) */
    dividenddate: number;
    /** 财报发布时间戳 */
    earningstimestamp?: number;
    /** 财报发布开始时间戳 */
    earningstimestampstart?: number;
    /** 财报发布结束时间戳 */
    earningstimestampend?: number;
    /** 财报电话会议开始时间戳 */
    earningscalltimestampstart?: number;
    /** 财报电话会议结束时间戳 */
    earningscalltimestampend?: number;
    /** 是否为预估财报日期 */
    isearningsdateestimate: boolean;
    /** 每股收益 (TTM) */
    epstrailingtwelvemonths: number;
    /** 每股收益 (Forward) */
    epsforward: number;
    /** 当前年度每股收益 */
    epscurrentyear: number;
    /** 当前年度市盈率 */
    priceepscurrentyear: number;
    /** 相对50日均线涨跌额 */
    fiftydayaveragechange: number;
    /** 相对50日均线涨跌幅 */
    fiftydayaveragechangepercent: number;
    /** 相对200日均线涨跌额 */
    twohundreddayaveragechange: number;
    /** 相对200日均线涨跌幅 */
    twohundreddayaveragechangepercent: number;
    /** 数据源间隔 */
    sourceinterval: number;
    /** 交易所数据延迟 */
    exchangedatadelayedby: number;
    /** 曾用名 */
    prevname?: string;
    /** 更名日期 */
    namechangedate?: string;
    /** 平均分析师评级 */
    averageanalystrating: string;
    /** 常规市场涨跌幅 */
    regularmarketchangepercent: number;
    /** 常规市场价格 */
    regularmarketprice: number;
    /** 市场状态 */
    marketstate: string;
    /** 显示名称 */
    displayname: string;
    /** 动态 PEG 比率 */
    trailingpegratio: number;
}

/**
 * 通用财务报表数据项 (包含资产负债表、利润表、现金流量表常见字段)
 * 使用可选属性以适应不同类型的报表
 */
export interface FinancialStatementData {
    // --- Balance Sheet Fields ---
    treasurysharesnumber?: number | null;
    ordinarysharesnumber?: number | null;
    shareissued?: number | null;
    netdebt?: number | null;
    totaldebt?: number | null;
    tangiblebookvalue?: number | null;
    investedcapital?: number | null;
    workingcapital?: number | null;
    nettangibleassets?: number | null;
    capitalleaseobligations?: number | null;
    commonstockequity?: number | null;
    totalcapitalization?: number | null;
    totalequitygrossminorityinterest?: number | null;
    stockholdersequity?: number | null;
    gainslossesnotaffectingretainedearnings?: number | null;
    otherequityadjustments?: number | null;
    treasurystock?: number | null;
    retainedearnings?: number | null;
    additionalpaidincapital?: number | null;
    capitalstock?: number | null;
    commonstock?: number | null;
    preferredstock?: number | null;
    totalliabilitiesnetminorityinterest?: number | null;
    totalnoncurrentliabilitiesnetminorityinterest?: number | null;
    othernoncurrentliabilities?: number | null;
    employeebenefits?: number | null;
    tradeandotherpayablesnoncurrent?: number | null;
    noncurrentdeferredliabilities?: number | null;
    noncurrentdeferredrevenue?: number | null;
    noncurrentdeferredtaxesliabilities?: number | null;
    longtermdebtandcapitalleaseobligation?: number | null;
    longtermcapitalleaseobligation?: number | null;
    longtermdebt?: number | null;
    currentliabilities?: number | null;
    othercurrentliabilities?: number | null;
    currentdeferredliabilities?: number | null;
    currentdeferredrevenue?: number | null;
    currentdebtandcapitalleaseobligation?: number | null;
    currentcapitalleaseobligation?: number | null;
    currentdebt?: number | null;
    othercurrentborrowings?: number | null;
    currentprovisions?: number | null;
    payablesandaccruedexpenses?: number | null;
    currentaccruedexpenses?: number | null;
    interestpayable?: number | null;
    payables?: number | null;
    totaltaxpayable?: number | null;
    accountspayable?: number | null;
    totalassets?: number | null;
    totalnoncurrentassets?: number | null;
    othernoncurrentassets?: number | null;
    noncurrentprepaidassets?: number | null;
    noncurrentdeferredassets?: number | null;
    noncurrentdeferredtaxesassets?: number | null;
    noncurrentaccountsreceivable?: number | null;
    investmentsandadvances?: number | null;
    otherinvestments?: number | null;
    investmentinfinancialassets?: number | null;
    availableforsalesecurities?: number | null;
    goodwillandotherintangibleassets?: number | null;
    otherintangibleassets?: number | null;
    goodwill?: number | null;
    netppe?: number | null;
    accumulateddepreciation?: number | null;
    grossppe?: number | null;
    leases?: number | null;
    constructioninprogress?: number | null;
    otherproperties?: number | null;
    machineryfurnitureequipment?: number | null;
    buildingsandimprovements?: number | null;
    landandimprovements?: number | null;
    properties?: number | null;
    currentassets?: number | null;
    othercurrentassets?: number | null;
    prepaidassets?: number | null;
    inventory?: number | null;
    finishedgoods?: number | null;
    workinprocess?: number | null;
    rawmaterials?: number | null;
    receivables?: number | null;
    accountsreceivable?: number | null;
    allowancefordoubtfulaccountsreceivable?: number | null;
    grossaccountsreceivable?: number | null;
    cashcashequivalentsandshortterminvestments?: number | null;
    othershortterminvestments?: number | null;
    cashandcashequivalents?: number | null;
    restrictedcash?: number | null;

    // --- Income Statement Fields ---
    taxeffectofunusualitems?: number | null;
    taxrateforcalcs?: number | null;
    normalizedebitda?: number | null;
    totalunusualitems?: number | null;
    totalunusualitemsexcludinggoodwill?: number | null;
    netincomefromcontinuingoperationnetminorityinterest?: number | null;
    reconcileddepreciation?: number | null;
    reconciledcostofrevenue?: number | null;
    ebitda?: number | null;
    ebit?: number | null;
    netinterestincome?: number | null;
    interestexpense?: number | null;
    interestincome?: number | null;
    normalizedincome?: number | null;
    netincomefromcontinuinganddiscontinuedoperation?: number | null;
    totalexpenses?: number | null;
    totaloperatingincomeasreported?: number | null;
    dilutedaverageshares?: number | null;
    basicaverageshares?: number | null;
    dilutedeps?: number | null;
    basiceps?: number | null;
    dilutedniavailtocomstockholders?: number | null;
    netincomecommonstockholders?: number | null;
    netincome?: number | null;
    netincomeincludingnoncontrollinginterests?: number | null;
    netincomecontinuousoperations?: number | null;
    taxprovision?: number | null;
    pretaxincome?: number | null;
    otherincomeexpense?: number | null;
    othernonoperatingincomeexpenses?: number | null;
    specialincomecharges?: number | null;
    restructuringandmergernacquisition?: number | null;
    netnonoperatinginterestincomeexpense?: number | null;
    interestexpensenonoperating?: number | null;
    interestincomenonoperating?: number | null;
    operatingincome?: number | null;
    operatingexpense?: number | null;
    researchanddevelopment?: number | null;
    sellinggeneralandadministration?: number | null;
    grossprofit?: number | null;
    costofrevenue?: number | null;
    // totalrevenue 已经存在于 Info 中，但此处也会出现
    operatingrevenue?: number | null;

    // --- Cash Flow Fields ---
    // freecashflow, operatingcashflow 已经存在于 Info 中
    repurchaseofcapitalstock?: number | null;
    repaymentofdebt?: number | null;
    issuanceofdebt?: number | null;
    capitalexpenditure?: number | null;
    interestpaidsupplementaldata?: number | null;
    incometaxpaidsupplementaldata?: number | null;
    endcashposition?: number | null;
    beginningcashposition?: number | null;
    changesincash?: number | null;
    financingcashflow?: number | null;
    cashflowfromcontinuingfinancingactivities?: number | null;
    netotherfinancingcharges?: number | null;
    proceedsfromstockoptionexercised?: number | null;
    cashdividendspaid?: number | null;
    commonstockdividendpaid?: number | null;
    netcommonstockissuance?: number | null;
    commonstockpayments?: number | null;
    netissuancepaymentsofdebt?: number | null;
    netlongtermdebtissuance?: number | null;
    longtermdebtpayments?: number | null;
    longtermdebtissuance?: number | null;
    investingcashflow?: number | null;
    cashflowfromcontinuinginvestingactivities?: number | null;
    netotherinvestingchanges?: number | null;
    netinvestmentpurchaseandsale?: number | null;
    saleofinvestment?: number | null;
    purchaseofinvestment?: number | null;
    netbusinesspurchaseandsale?: number | null;
    purchaseofbusiness?: number | null;
    netppepurchaseandsale?: number | null;
    purchaseofppe?: number | null;
    capitalexpenditurereported?: number | null;
    // operatingcashflow defined below/above
    cashflowfromcontinuingoperatingactivities?: number | null;
    changeinworkingcapital?: number | null;
    changeinotherworkingcapital?: number | null;
    changeinothercurrentliabilities?: number | null;
    changeinpayablesandaccruedexpense?: number | null;
    changeinaccruedexpense?: number | null;
    changeinpayable?: number | null;
    changeinaccountpayable?: number | null;
    changeinprepaidassets?: number | null;
    changeininventory?: number | null;
    changeinreceivables?: number | null;
    changesinaccountreceivables?: number | null;
    othernoncashitems?: number | null;
    stockbasedcompensation?: number | null;
    deferredtax?: number | null;
    deferredincometax?: number | null;
    depreciationamortizationdepletion?: number | null;
    depreciationandamortization?: number | null;
    amortizationcashflow?: number | null;
    amortizationofintangibles?: number | null;
    depreciation?: number | null;
    operatinggainslosses?: number | null;
    gainlossoninvestmentsecurities?: number | null;
    // netincomefromcontinuingoperations defined below/above
    saleofbusiness?: number | null;
    gainlossonsaleofbusiness?: number | null;
}

/**
 * 财务历史数据映射 (日期 -> 数据)
 */
export type FinancialHistory = Record<string, FinancialStatementData>;

/**
 * 新闻图片缩略图分辨率接口
 */
export interface NewsThumbnailResolution {
    /** URL */
    url: string;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 标签 (例如 original, 170x128) */
    tag: string;
}

/**
 * 新闻图片缩略图接口
 */
export interface NewsThumbnail {
    /** 原始 URL */
    originalurl: string;
    /** 原始宽度 */
    originalwidth: number;
    /** 原始高度 */
    originalheight: number;
    /** 标题/说明 */
    caption?: string;
    /** 不同分辨率列表 */
    resolutions?: NewsThumbnailResolution[] | null;
}

/**
 * 新闻内容接口
 */
export interface NewsContent {
    /** ID */
    id: string;
    /** 内容类型 (例如 STORY, VIDEO) */
    contenttype: string;
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 摘要 */
    summary: string;
    /** 发布日期 */
    pubdate: string;
    /** 显示时间 */
    displaytime: string;
    /** 是否托管 */
    ishosted: boolean;
    /** 缩略图 */
    thumbnail?: NewsThumbnail;
    /** 提供商信息 */
    provider: {
        displayname: string;
        url?: string;
        sourceid?: string;
    };
    /** 规范 URL */
    canonicalurl?: {
        url: string;
        site?: string;
        region?: string;
        lang?: string;
    };
    /** 点击跳转 URL */
    clickthroughurl?: {
        url: string;
        site?: string;
        region?: string;
        lang?: string;
    };
}

/**
 * 聚合新闻项接口
 */
export interface AggregatedNewsItem {
    /** ID */
    id: string;
    /** 新闻内容 */
    content: NewsContent;
}

/**
 * 股票拆分信息接口
 */
export interface StockSplit {
    /** 日期 */
    date: string;
    /** 比例 (例如 10, 4) */
    ratio: number;
}

/**
 * 股票分红信息接口
 */
export interface StockDividend {
    /** 日期 */
    date: string;
    /** 金额 */
    amount: number;
}

/**
 * 股票财务数据聚合 API 响应接口
 */
export interface StockFinancialDataAggregationResponse {
    /** 响应状态码 */
    code: string;
    /** 响应消息 */
    message: string;
    /** 数据对象 */
    data: {
        /** 详细信息 */
        info: StockFinancialInfo;
        /** 年度资产负债表 */
        balance_yearly_yefinancials: FinancialHistory;
        /** 季度资产负债表 */
        balance_quarterly_yefinancials: FinancialHistory;
        /** 年度利润表 */
        income_yearly_yefinancials: FinancialHistory;
        /** 季度利润表 */
        income_quarterly_yefinancials: FinancialHistory;
        /** 年度现金流量表 */
        cashflow_yearly_yefinancials: FinancialHistory;
        /** 季度现金流量表 */
        cashflow_quarterly_yefinancials: FinancialHistory;
        /** 新闻列表 */
        news: AggregatedNewsItem[];
        /** 拆股历史 */
        splits: StockSplit[];
        /** 分红历史 */
        dividends: StockDividend[];
    };
}
