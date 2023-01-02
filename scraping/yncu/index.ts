import goToLogin from "./steps/goToLogin";
import login from './steps/login';
import { Page } from "puppeteer";
import goToAccount from "./steps/goToAccount";
import downloadCsv from "./steps/downloadCsv";
import { getLoginCred, getSecuirityQuestions } from "../getCreds";
import createSaveTransactionsFn from "../types/saveTransactions";
import persistTransactions from "./steps/persistTransactions";
import { Client } from "pg";


export default async function scrapeYncuStatements(page: Page, db: Client) {
  try {
    await goToLogin(page);
    await login(page,
      {
        getLoginCreds: () => getLoginCred(db),
        getSecQuestions: () => getSecuirityQuestions(db)
      }
    );
    await goToAccount(page);
    await downloadCsv(page);
    await persistTransactions(createSaveTransactionsFn(db));
  } catch (err) {
    console.error(err);
  }
}