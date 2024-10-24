import { timeoutFetch } from "fetch-helper-x";

const NORMAL_URL
    = "https://data.jsdelivr.com/v1/package/npm/typescript/badge";
const GOOGLE_ADS_URL
    = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

/**
 * Check if the current web browser has any ad blockers enabled. If so, ads will have been blocked.
 */
export const checkAdBlock = async (): Promise<boolean> => {
    try {
        const result = await timeoutFetch(GOOGLE_ADS_URL, {
            method: "HEAD",
            requestTimeout: 15000,
        });

        const contentLength = result.headers.get("content-length");

        return contentLength === null || !(parseInt(contentLength) > 40000);
    } catch {
        // Check network availibility
        try {
            await timeoutFetch(NORMAL_URL, {
                method: "HEAD",
                requestTimeout: 15000,
            });

            // The network seems okay

            return true;
        } catch (_error) {
            return false;
        }
    }
};
