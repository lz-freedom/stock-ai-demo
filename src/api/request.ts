import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// 定义接口响应格式
export interface ApiResponse<T = any> {
    code: string | number;
    message: string;
    data: T;
}

// 扩展 AxiosRequestConfig 以支持自定义选项
export type CustomRequestOptions = AxiosRequestConfig & {
    /** 是否隐藏错误提示 (默认为 false) */
    hideErrorToast?: boolean;
    /** 是否直接返回 response 而不是 response.data */
    returnOriginResponse?: boolean;
    /** 是否跳过 token 注入 */
    skipToken?: boolean;
};

// 获取 Base URL
// 优先使用 VITE_API_BASE_URL，如果没有则默认为空字符串（走代理或相对路径）
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

console.log('StockAI Env Config:', {
    VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_PROXY_FAST_FINANCE_API: import.meta.env.VITE_PROXY_FAST_FINANCE_API, // Used for /api
    VITE_PROXY_POLY_BULL_API: import.meta.env.VITE_PROXY_POLY_BULL_API,       // Used for /pb
});

// 创建 Axios 实例
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const options = config as CustomRequestOptions;

        // 自动注入 Token
        if (!options.skipToken) {
            const token = useAuthStore.getState().token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const config = response.config as CustomRequestOptions;

        // 如果需要返回原始响应
        if (config.returnOriginResponse) {
            return response;
        }

        // 标准响应解包
        // 假设后端的标准成功 code 为 200 或 "200000" (根据用户示例)
        // 这里需要确认后端的 code 约定。用户示例中是 '200000'。
        const res = response.data;

        // 兼容不同的 code 类型 (数字或字符串)
        const code = String(res.code);

        if (code === '200' || code === '200000') {
            return res.data; // 直接返回 data 字段
        } else {
            // 业务错误处理
            const errorMessage = res.message || '请求失败';

            if (!config.hideErrorToast) {
                // Debug log: print full response to debug backend code/structure
                console.error(`[API Error Debug] URL: ${config.url}`, res);
                console.error(`[API Error] ${errorMessage}`);
                // alert(errorMessage); 
            }

            return Promise.reject(new Error(errorMessage));
        }
    },
    (error: AxiosError<ApiResponse>) => {
        const config = error.config as CustomRequestOptions | undefined;
        let message = '网络错误，请稍后重试';

        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 401:
                    message = '未授权，请重新登录';
                    // 可以在这里触发登出逻辑
                    useAuthStore.getState().logout();
                    break;
                case 403:
                    message = '拒绝访问';
                    break;
                case 404:
                    message = '请求的资源不存在';
                    break;
                case 500:
                    message = '服务器内部错误';
                    break;
                default:
                    message = error.response.data?.message || `请求错误 ${status}`;
            }
        } else if (error.request) {
            message = '服务器无响应';
        }

        if (!config?.hideErrorToast) {
            console.error(`[Network Error] ${message}`);
        }

        return Promise.reject(new Error(message));
    }
);

/**
 * 封装的 request 函数，兼容 openapi-ts-request 生成代码的调用方式
 */
export const request = async <T = any>(
    url: string,
    options: CustomRequestOptions = {}
): Promise<T> => {
    return service.request<any, T>({
        url,
        ...options,
    });
};

export default request;
