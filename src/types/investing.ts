export interface InvestingTranslation {
    /** 源文本 */
    source: string;
    /** 翻译文本 */
    translation: string;
    /** 语言代码 (例如: "zh-CN") */
    language_code: string;
}

export interface InvestingTranslationResponse {
    /** 响应状态码 */
    code: string;
    /** 响应消息 */
    message: string;
    /** 数据对象 */
    data: {
        /** 翻译列表 */
        translations: InvestingTranslation[];
    };
}
