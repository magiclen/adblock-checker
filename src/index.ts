import { timeoutFetch } from "fetch-helper-x";

const GOOGLE_ADS_URL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

// A URL which ad blockers do not block. It is only used to check whether the network is available.
const NORMAL_URL = "https://data.jsdelivr.com/v1/package/npm/typescript/badge";

const REQUEST_TIMEOUT = 15_000;

// The real `adsbygoogle.js` is about 200 KB, while a fake script from an ad blocker is much smaller or has no `Content-Length`.
const MIN_ADS_SCRIPT_SIZE = 40_000;

const isNetworkAvailable = async (): Promise<boolean> => {
    try {
        // `no-cors` lets any HTTP response count, so this check does not depend on the CORS headers of the server.
        await timeoutFetch(NORMAL_URL, {
            method: "HEAD",
            mode: "no-cors",
            requestTimeout: REQUEST_TIMEOUT,
        });

        return true;
    } catch {
        return false;
    }
};

/**
 * Checks whether the current web browser has any ad blockers enabled. If so, ads are blocked.
 *
 * It returns `false` if the network is not available.
 */
export const checkAdBlock = async (): Promise<boolean> => {
    try {
        const response = await timeoutFetch(GOOGLE_ADS_URL, {
            method: "HEAD",
            requestTimeout: REQUEST_TIMEOUT,
        });

        const contentLength = response.headers.get("content-length");

        return (
            contentLength === null || !(Number.parseInt(contentLength, 10) > MIN_ADS_SCRIPT_SIZE)
        );
    } catch {
        // The ads script cannot be loaded, so it is blocked unless the network is down.
        return isNetworkAvailable();
    }
};
