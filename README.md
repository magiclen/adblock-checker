AdBlock Checker
==========

[![CI](https://github.com/magiclen/adblock-checker/actions/workflows/ci.yml/badge.svg)](https://github.com/magiclen/adblock-checker/actions/workflows/ci.yml)

Check if the current web browser has any ad blockers (AdBlock, Adblock Plus, uBlock, AdGuard, ...) enabled.

## Usage

```typescript
import { checkAdBlock } from "adblock-checker";

console.log(await checkAdBlock()); // true or false
```

### How It Works

`checkAdBlock` sends a `HEAD` request for the Google ads script on `pagead2.googlesyndication.com`. It returns `true` if the request is blocked, or if the script is replaced with a small fake one.

When the request fails, it sends another `HEAD` request to `data.jsdelivr.com` to check whether the network is available. If the network is not available, it returns `false`.

Each request times out after 15 seconds.

### Content Security Policy

If your website uses a Content Security Policy, `connect-src` must allow both `https://pagead2.googlesyndication.com` and `https://data.jsdelivr.com`, otherwise the result is wrong. For example, if only `data.jsdelivr.com` is allowed, every visitor is detected as using an ad blocker.

## Usage for Browsers

[Source](demo.html)

[Demo Page](https://rawcdn.githack.com/magiclen/adblock-checker/master/demo.html)

## License

[MIT](LICENSE)
