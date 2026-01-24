import { useCallback } from 'react';
import { BASE_URL } from './config';

export type RequestMethod = 'POST' | 'GET';
export type Props = {
    method?: RequestMethod;
    url: string;
    body: Record<string, any>;
    headers?: Record<string, string>
}

export const useSendHttpRequest = () => {
    return useCallback(async (httpRequestConfig: Props) => {
        const { method = 'GET', headers, body, url } = httpRequestConfig;
        const requestUrl = `${BASE_URL}${url}.php`;

        const response = await fetch(requestUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json() as Record<string, any>;
    }, [])
};