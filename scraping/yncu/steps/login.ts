import puppeteer from 'puppeteer';
import waitForLoad from "./utils/waitForLoad";

export type LoginCreds = { username: string, pw: string };
export type QuestionAnswerMap = { [key: string]: string };

export interface Visitors {
  getLoginCreds: () => Promise<LoginCreds>;
  getSecQuestions: (question: string) => Promise<QuestionAnswerMap>;
}

async function isAccountPage(page: puppeteer.Page) {
  const title = await page.title();
  return title.includes("My Accounts");
}

async function answerSecQuestions(page: puppeteer.Page, visitors: Visitors) {
  const text = await page.$('label');
  const question = await text?.evaluate(e => e.textContent) || '';
  await page.focus("#answer");

  const qaMap = await visitors.getSecQuestions(question)
  await page.keyboard.type(qaMap[question]);

  const cont = await page.$("#Continue");
  cont?.click();
}

async function performLogin(page: puppeteer.Page, visitors: Visitors) {
  const creds = await visitors.getLoginCreds()
  await page.focus("input#acctnum");
  await page.keyboard.type(creds.username);

  await page.focus("input#pac");
  await page.keyboard.type(creds.pw);

  const element = await page.$("#Continue");
  element?.click();
}


export default async function login(page: puppeteer.Page, visitors: Visitors) {
  if (process.env.DEBUG) {
    await page.screenshot({ path: 'login1-start.png' });
  }
  try {
    await page.waitForSelector("input#acctnum")

    await performLogin(page, visitors);

    await waitForLoad(page);

    if (await isAccountPage(page)) {
      return;
    }

    await answerSecQuestions(page, visitors);

    await waitForLoad(page);

    if (process.env.DEBUG) {
      await page.screenshot({ path: 'login1-end.png' });
    }
  } catch (err) {
    if (process.env.DEBUG) {
      await page.screenshot({ path: 'login1-error.png' });
    }
  }
  return page;
}