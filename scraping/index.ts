import scrapeYncuStatements from "./yncu";
import puppeteer from "puppeteer";
import getDb from "./db";

(async () => {
  const [db, closeDb] = await getDb();
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    args: [
      "--start-maximized"
    ]
  });

  let b = await browser.createIncognitoBrowserContext();

  const page = await b.newPage();
  try {
    await scrapeYncuStatements(page, db);
  } finally {
    await closeDb(),
      browser.close();
  }
})();