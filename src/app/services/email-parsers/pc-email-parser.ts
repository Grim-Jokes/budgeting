import { EmailParser } from "./email-parser";
import { Transaction } from '../../../models/entities';
import { Amount, Merchant, TransactionDate } from "../../../models/value-objects";

function getRegexValue(value: RegExpMatchArray | null): string | undefined {
    if (value) {
        return value[0];
    }

    return;
}

export class PCEmailParser implements EmailParser {
    parseEmailBody(_body: string): Transaction {
        const amountRegexMatch =_body.match(/\$[\d\.]{4,}/);
        const merchantRegexMatch = _body.match(/Merchant: [\w\d ]{1,}/i);
        const dateRegexMatch = _body.match(/Transaction Date: [\w\d, ]*/i);

        
        let amount: Amount;
        let merchant: Merchant;
        let date: TransactionDate; 

        try {
            let val = getRegexValue(amountRegexMatch);

            if (val) {
                amount = new Amount(val.replace('$', ''));
            } else {
                throw new Error("Amount is null or undefined");
            }
            
            val = getRegexValue(merchantRegexMatch);
            if (val) {
                merchant = new Merchant(val);
            }  else {
                throw new Error("Merchant is null or undefined");
            }          
            
            
            val = getRegexValue(dateRegexMatch);
            if (val) {
                date = new TransactionDate(val);
            } else {
                throw new Error("TransactionDate is null or undefined");
            }
        }
        catch(err) {
            throw err
        }

        return new Transaction({
            amount,
            merchant,
            date
        });
    }
}