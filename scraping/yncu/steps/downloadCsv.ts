import { Page } from "puppeteer";
import waitForLoad from "./utils/waitForLoad";

async function selectDateRange(page: Page) {
  return page.select("#stype", "reverse_csv")
}

async function setStartDate(page: Page) {
  return page.select("#RadioTimeTypeValue", "this-year")
}


async function clickGetActivities(page: Page) {
  const [getActivitiesButton] = await page.$$("#getAccountActivity");

  return getActivitiesButton.click();
}

async function clickActualDownloadButton(page: Page) {
  if (process.env.DEBUG) {
    await page.screenshot({ path: "continue.png" })
  }
  const [downloadButton] = await page.$$("#Continue");

  page.on('load', () => console.log("loaded"));

  await downloadButton.click();

  await page.waitForResponse((res) => {
    return res.url().includes("/MDContent/Statement/statement.csv")
      && res.status() == 200
  }, { timeout: 10000 });


  // Wait up to 10 seconds to download CSV
  // This was the path of least resistance to ensure 
  // we download everything.
  await page.waitForTimeout(10000);
}

export default async function downloadCsv(page: Page) {
  if (process.env.DEBUG) {
    page.screenshot({ path: "downloadCsv-start.png" })
  }

  await selectDateRange(page);

  await setStartDate(page);

  if (process.env.DEBUG) {
    await page.screenshot({ path: "after-start.png" })
  }

  await clickGetActivities(page);

  await waitForLoad(page);

  if (process.env.DEBUG) {
    await page.screenshot({ path: "getActivities.png" })
  }

  await page.client().send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './' });

  await clickActualDownloadButton(page);

  if (process.env.DEBUG) {
    await page.screenshot({ path: "downloadCsv-end.png" })
  }
}