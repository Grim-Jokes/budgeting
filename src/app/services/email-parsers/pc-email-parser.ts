import { EmailParser } from "./email-parser";
import { Transaction } from '../../../models/entities';

export class PCEmailParser implements EmailParser {
    parseEmailBody(_body: string): Transaction {
        throw new Error("Method not implemented.");
    }
}