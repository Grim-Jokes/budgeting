import { Page } from "puppeteer";
import waitForLoad from "./utils/waitForLoad";

export default async function goToAccount(page: Page) {
  if (process.env.DEBUG) {
    page.screenshot({ path: "goToAccount-start.png" })
  }

  const [mainAccount] = await page.$$('a.value');

  await mainAccount.click();

  await waitForLoad(page);

  if (process.env.DEBUG) {
    await page.screenshot({ path: "goToAccount-end.png" })
  }
}