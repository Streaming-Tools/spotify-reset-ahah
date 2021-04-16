import os from "os";
import puppeteer from "puppeteer-extra";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { logfuckoutlawz } from "./logout";

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: process.env.TOKEN_2CAPTCHA,
    },
    visualFeedback: true,
    throwOnError: true,
  })
);

export function outlawzFuckPath() {
  switch (os.platform()) {
    case "linux":
      return "/usr/bin/google-chrome";
    case "win32":
      return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    case "darwin":
      return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    default:
      logfuckoutlawz.warn(`NO find PAth ahah fuck bigmac`);
      return "";
  }
}

export function bigmacDoucheBrowser(proxy?: string) {
  const args = ["--ignore-certificate-errors"];

  if (proxy) {
    args.push("--proxy-server=" + proxy);
  } else {
    logfuckoutlawz.warn("browser without proxy damn bitch");
  }

  const browser = puppeteer.launch({
    args,
    headless: false,
    executablePath: outlawzFuckPath(),
  });

  return browser;
}
