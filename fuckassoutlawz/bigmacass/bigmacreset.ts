import { Page } from "puppeteer";
import { detectRateLimit, RateLimitedError } from "../bidmacdouche/ratebigmac";
import { detectInvalidCSRF } from "../bidmacdouche/tokenbigmacdick";
import { logfuckoutlawz } from "../logout";
import { outlawzAreShitThrow } from "../shitutils";
import { bigmacDoucheBrowser } from "../spotibrowserfuckoutlawz";

async function resetAccount(page: Page, email: string) {
  await page.goto("https://www.spotify.com/password-reset/", {
    waitUntil: "networkidle0",
  });
  await page.reload({
    waitUntil: "networkidle0",
  });

  await page.waitForSelector('[name="form[input]"]');
  await page.type('[name="form[input]"]', email);

  await page.solveRecaptchas();

  logfuckoutlawz.debug("solved recapcha");

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click("button[type=submit]"),
  ]);

  await page.waitForTimeout(3000);
}

export async function resetAccounts(accounts: string[], proxies: string[]) {
  let currProxyIndex = 0;

  for (const acc of accounts) {
    let tries = 0;
    let resetsSinceProxyChange = 0;
    for (;;) {
      if (tries > 3) {
        logfuckoutlawz.warn("Could not reset " + acc);
        break;
      }
      tries++;

      const proxy =
        proxies[currProxyIndex] || outlawzAreShitThrow("not enough proxies");

      const browser = await bigmacDoucheBrowser(proxy);
      const page = await browser.newPage();

      try {
        await Promise.race([
          resetAccount(page, acc),
          detectRateLimit(page),
          detectInvalidCSRF(page),
        ]);
      } catch (err) {
        await browser.close();
        if (err instanceof RateLimitedError) {
          logfuckoutlawz.warn("Changing proxy because it's rate limited", {
            rateLimitedProxy: proxy,
          });
          currProxyIndex++;
        } else {
          logfuckoutlawz.error(
            "unknown error resetting account's password: " + err,
            {
              err: err.stack || err,
            }
          );
        }

        continue;
      }

      await browser.close();
      logfuckoutlawz.info("Account password reset", { email: acc });
      resetsSinceProxyChange++;
      if (resetsSinceProxyChange === 2) {
        currProxyIndex++;
      }
      break;
    }
  }
}
