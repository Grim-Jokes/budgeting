import { Page } from "puppeteer";
import waitForLoad from "./utils/waitForLoad";

async function selectDateRange(page: Page) {
  const [dateRangeRadio] = await page.$$('input.checkbox.eventEnabledFields2');

  return dateRangeRadio.click();
}

async function setStartDate(page: Page) {
  const [startDateInput] = await page.$$('#StartDateValue');

  await startDateInput.click({ clickCount: 3 });

  const year = new Date().getFullYear();
  return startDateInput.type(`01/01/${year}`);
}

async function setCsvFromOldestDate(page: Page) {
  const [advancedOptions] = await page.$$('.showHideSwitch11.icon');

  await advancedOptions.click();

  return page.select("#stype", "reverse_csv");
}

async function clickGetActicities(page: Page) {
  const [getActivitiesButton] = await page.$$("#getAccountActivity");

  return getActivitiesButton.click();
}

async function clickActualDownloadButton(page: Page) {
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

  await setCsvFromOldestDate(page);  

  await clickGetActicities(page);

  await waitForLoad(page);

  await page.client().send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './' });

  await clickActualDownloadButton(page);

  if (process.env.DEBUG) {
    await page.screenshot({ path: "downloadCsv-end.png" })
  }
}