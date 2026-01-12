import type { GenerateServiceProps } from 'openapi-ts-request'

export default [
    {
        schemaPath: 'http://127.0.0.1:9000/api.json',
        serversPath: './src/api/app',
        requestLibPath: `import request from '@/api/request';\n import { CustomRequestOptions } from '@/api/request';`,
        requestOptionsType: 'CustomRequestOptions',
        isGenReactQuery: false,
        reactQueryMode: 'react',
        isGenJavaScript: false,
        includeTags: ['金牛AI/APP/股票'],
    },
] as GenerateServiceProps[]
