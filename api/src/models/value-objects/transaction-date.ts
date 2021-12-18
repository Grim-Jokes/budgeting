export class InvalidDateError extends TypeError {
    name: string = "INVALID_DATE_ERROR";
}

export class TransactionDate {

    private _date: Date;

    public constructor(date: string | number) {

        if (date == null) {
            throw new Error("Transaction date cannot be undefined");
        }

        const tempDate = new Date(date);

        if (isNaN(tempDate.getTime())) {
            throw new InvalidDateError(`Date ${date} is not valid`)
        }

        this._date = tempDate;
    }

    public get date(): Date {
        return this._date;
    }
}