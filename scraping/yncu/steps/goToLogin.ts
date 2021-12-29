import { BANK_URL } from "../config";

import puppeteer from 'puppeteer';

export default async function goToLogin(page: puppeteer.Page) {
  await page.goto(BANK_URL);
  if (process.env.DEBUG) {
    await page.screenshot({ path: 'login.png' });
  }

  return page;
}