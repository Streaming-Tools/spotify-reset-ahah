import { Page } from "puppeteer";

export async function detectInvalidCSRF(page: Page) {
  await page.waitForXPath(
    '//./text()[contains(., "The CSRF token is invalid. Please try to resubmit the form")]',
    { timeout: 0 }
  );
  throw new Error("invalid CSRF token");
}
