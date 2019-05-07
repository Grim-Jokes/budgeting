import { PCEmailParser } from "../services/email-parsers/pc-email-parser";
import { Transaction } from "src/models/entities";

const TEST_EMAIL = `
ACCOUNT INFORMATION
Hi DANIEL,
A purchase of $3.54 was made on your President's Choice Financial(R) Mastercard(R) ending in 3464 on May 06, 2019.
Card number: ************3464
Merchant: Medical Provider 
Purchase amount: $3.54
Transaction date: May 06, 2019
If you or an authorized user on the account did not make this purchase, please call us at 1 866 246 7262.
View your transactions and manage your alerts by logging into your online account.
Thank you,
PC Financial(R)
This email alert about your account was sent by President's Choice Bank PO Box 4403, Station A, Toronto, ON, M5W 5Y4, or, 
mailto:talktous@pcmastercard.pcfinancial.ca 
talktous@pcmastercard.pcfinancial.ca 
To modify your optional alert preferences please login to your PC Financial account online.
This email is intended only for the original recipient and is not transferable. Please DO NOT REPLY to this email.
(R)PC, President's Choice, PC Financial, and President's Choice Financial are registered trademarks of Loblaws Inc. Trademarks used under licence. 
(R)/TMMastercard is a registered trademark, and the circles design is a trademark of Mastercard International Incorporated. President's Choice Bank is a licensee of the mark. All other trademarks are property of their respective owners.`

describe("PC Email Parser", () => {
    it("Should parse the html body into a transaction", () => {
        const parser = new PCEmailParser();
        let transaction: Transaction | undefined;
        expect(() => {
            transaction  = parser.parseEmailBody(TEST_EMAIL);
            expect(transaction).toBeTruthy();
            expect(transaction.amount.value).toEqual(3.54);
        }).not.toThrow(Error);
        

        
    })
})