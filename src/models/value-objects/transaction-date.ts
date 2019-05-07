export class TransactionDate {

    private _date: Date;

    public constructor(date: string | number) {
        const tempDate = new Date(date);

        if (isNaN(tempDate.getTime())) {
            throw new Error(`Date ${date} is not valid`)
        }
        this._date = tempDate;
        
    }

    public get date(): Date {
        return this._date;
    }
}