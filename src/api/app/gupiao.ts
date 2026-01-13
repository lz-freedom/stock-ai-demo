/* eslint-disable */
// @ts-ignore
import request from '@/api/request';
import { CustomRequestOptions } from '@/api/request';

import * as API from './types';

/** 股票指标 GET /pb/app/stock/base_quota */
export function appStockBaseQuotaUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockBaseQuotaUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockBaseQuotaUsingGetResponse>(
    '/pb/app/stock/base_quota',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 批量查询最新股价信息 GET /pb/app/stock/batch_latest_price */
export function appStockBatchLatestPriceUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockBatchLatestPriceUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockBatchLatestPriceUsingGetResponse>(
    '/pb/app/stock/batch_latest_price',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 股票财务数据 GET /pb/app/stock/financials_data */
export function appStockFinancialsDataUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockFinancialsDataUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockFinancialsDataUsingGetResponse>(
    '/pb/app/stock/financials_data',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 股票历史数据 GET /pb/app/stock/history_data */
export function appStockHistoryDataUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockHistoryDataUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockHistoryDataUsingGetResponse>(
    '/pb/app/stock/history_data',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 查询单只股票最新股价信息 GET /pb/app/stock/latest_price */
export function appStockLatestPriceUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockLatestPriceUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockLatestPriceUsingGetResponse>(
    '/pb/app/stock/latest_price',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 热门股票列表 GET /pb/app/stock/most_active_list */
export function appStockMostActiveListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockMostActiveListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockMostActiveListUsingGetResponse>(
    '/pb/app/stock/most_active_list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 热门股票列表-根据国家或地区分组-缓存 GET /pb/app/stock/most_active_region_group */
export function appStockMostActiveRegionGroupUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockMostActiveRegionGroupUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockMostActiveRegionGroupUsingGetResponse>(
    '/pb/app/stock/most_active_region_group',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 股票新闻 GET /pb/app/stock/news */
export function appStockNewsUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockNewsUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockNewsUsingGetResponse>('/pb/app/stock/news', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 股票关联数据 多周期涨跌幅、对比的股票列表、大家都在看的股票列表 GET /pb/app/stock/related_info */
export function appStockRelatedInfoUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockRelatedInfoUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockRelatedInfoUsingGetResponse>(
    '/pb/app/stock/related_info',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 搜索 同名股票按交易所 sort 排序非同名股票, 市值相等，按交易所 sort 排序非同名股票，市值不相等，按市值（USD）降序 GET /pb/app/stock/search */
export function appStockSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AppStockSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AppStockSearchUsingGetResponse>('/pb/app/stock/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
