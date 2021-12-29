import { Page } from "puppeteer";

export default async function waitForLoad(page: Page) {
  return page.waitForNavigation({ waitUntil: 'networkidle2' });
}