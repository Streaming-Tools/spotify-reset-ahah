import { Page } from "puppeteer";

export class RateLimitedError extends Error {
  constructor() {
    super("The proxy was rate-limited ahah. Just change.");
  }
}

/**
 * Detects when the reset have gone well.
 */
export async function detectRateLimit(page: Page) {
  await page.waitForXPath('//./text()[contains(., "429")]', { timeout: 0 });

  throw new RateLimitedError();
}
