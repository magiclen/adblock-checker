const NORMAL_URL = "https://cdn.jsdelivr.net/gh/magiclen/adblock-checker/dist/adblock-checker.min.js";
const GOOGLE_ADS_URL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

/**
 * Check if the current web browser has any ad blockers enabled. If so, ads will have been blocked.
 */
export const checkAdBlock = async (): Promise<boolean> => {
    try {
        const controller = new AbortController();

        setTimeout(() => {
            controller.abort();
        }, 15000);

        const result = await fetch(GOOGLE_ADS_URL, { method: "HEAD", signal: controller.signal });

        const contentLength = result.headers.get("content-length");

        return contentLength === null || !(parseInt(contentLength) > 40000);
    } catch {
        // Check network availibility
        try {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort();
            }, 15000);

            await fetch(NORMAL_URL, { method: "HEAD", signal: controller.signal });

            // The network seems okay

            return true;
        } catch (error) {
            return false;
        }
    }
};
