import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface Props {
    income: number,
    expenses: number
}

export function IncomeVsExpensesDoughnut(props: Props) {
    return <>
        <Doughnut
            options={{
                cutoutPercentage: 85,
                elements: {
                    arc: {
                        borderWidth: 0.1,
                        borderColor: 'black',
                    }
                }
            }}
            legend={{
                display: false,
            }}
            data={{
                labels: ["Income", "Expenses"],
                datasets: [{
                    data: [props.income, props.expenses],
                    borderWidth: 0,
                    backgroundColor: [
                        "#00AA00",
                        "rgb(190, 30, 0)"
                    ],

                }]
            }} />
    </>
}