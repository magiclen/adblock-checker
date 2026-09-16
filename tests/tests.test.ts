import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";

import { checkAdBlock } from "../src/index.ts";

const GOOGLE_ADS_URL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

afterEach(() => {
    mock.restoreAll();
});

describe("checkAdBlock", () => {
    it("ads are not blocked", async () => {
        mock.method(globalThis, "fetch", () =>
            Promise.resolve(new Response(null, { headers: { "content-length": "206697" } })),
        );

        assert.equal(false, await checkAdBlock());
    });

    it("ads are blocked", async () => {
        mock.method(globalThis, "fetch", (input: RequestInfo | URL) =>
            input === GOOGLE_ADS_URL
                ? Promise.reject(new TypeError("Failed to fetch"))
                : Promise.resolve(new Response(null)),
        );

        assert.equal(true, await checkAdBlock());
    });

    it("network is not available", async () => {
        mock.method(globalThis, "fetch", () => Promise.reject(new TypeError("Failed to fetch")));

        assert.equal(false, await checkAdBlock());
    });
});
