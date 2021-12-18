import React, { useEffect, useState } from 'react';
import { useGetTransactions } from '../../hooks/get-transactions';

import { Grid } from '@material-ui/core';
import { ExpensesDoughnut } from '../expenses-doughnut';
import { IncomeVsExpensesDoughnut } from '../income-vs-expense-doughnut';

import './dashboard.css';

interface Expenses {
    [merchantId: string]: number
}

export function Dashboard() {
    const transactions = useGetTransactions();

    let [income, setIncome] = useState(0);
    let [expenses, setExpenses] = useState<Expenses>({});

    useEffect(() => {
        let totalIncome = 0;
        let groupedExpenses: Expenses = {};
        transactions.forEach((x) => {
            if (x.amount > 0) {
                totalIncome += x.amount;
            } else if (x.amount < 0) {
                if (!groupedExpenses[x.merchant]) {
                    groupedExpenses[x.merchant] = 0;
                }
                groupedExpenses[x.merchant] += x.amount;

            } else {
                throw new Error("Amount is exactly 0, why is it a transaction?");
            }
        });

        setIncome(totalIncome);
        setExpenses(groupedExpenses);
    }, [transactions]);

    const merchants = Object.keys(expenses);
    const expenseAmounts = merchants.map((x) => expenses[x]);
    const expensesSum = expenseAmounts.reduce((prev, cur) => prev + cur, 0);


    return <>
        <Grid container direction={"column"} spacing={5}>
            <Grid container item className="section" xs={12}>
                <Grid item xs={2}>
                    <IncomeVsExpensesDoughnut income={income} expenses={expensesSum} />
                </Grid>
            </Grid>
            <Grid container direction={"row"} item spacing={2}>
                <Grid item>
                    <ExpensesDoughnut data={expenses} />
                </Grid>
                <Grid item>
                    <ExpensesDoughnut data={expenses} />
                </Grid>
                <Grid item>
                    <ExpensesDoughnut data={expenses} />
                </Grid>
            </Grid>
        </Grid>
    </>
}