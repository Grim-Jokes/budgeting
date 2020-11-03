import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface Props {
    data: { [merchant: string]: number }
}


export function getColour(val: number) {

    const thresholds = [15, 30, 75];

    for (const threshold of thresholds) {
        if (val <= threshold) {
            return threshold;
        }
    }

    return val;
}



export function ExpensesDoughnut(props: Props) {
    let merchants = Object.keys(props.data);
    const entries = merchants.map((merchant) => ({ merchant, amount: props.data[merchant] }));



    let sum = entries.reduce((prev, curr) => ({ merchant: '', amount: prev.amount + curr.amount }), { merchant: '', amount: 0 });

    let red = 0xAF;
    let green = 0;
    let stepSize = 30;

    const sorted = entries.sort((a, b) => a.amount < b.amount ? -1 : a.amount > b.amount ? 1 : 0);
    merchants = sorted.map((x) => x.merchant);
    let values = sorted.map((x) => x.amount);


    let bgColour = sorted.map((entry) => {
        let pct = entry.amount / sum.amount;

        if (green < 0x5F) {
            green += stepSize;
            red += stepSize / 2;
        }
        if (green > 0xFF) {
            green = 0xFF
        }

        if (green >= (0xFF / 2)) {
            if (red > 0) {
                red -= stepSize;
            }
            if (red < 0) {
                red = 0;
            }
        } else {
            // red = 0xFF
        }


        console.log(pct);

        const colour = `rgb(${red}, ${green}, 0)`;
        console.log(colour);
        return colour;

    });

    return <>
        <Doughnut
            options={{
                cutoutPercentage: 85,
                elements: {
                    arc: {
                        borderWidth: 0.1,
                        backgroundColor: 'blie',
                        borderColor: 'black',
                        borderAlign: 'left',
                    }
                },
            }}
            legend={{
                display: false,
            }}
            data={{
                labels: merchants,
                borderWidth: merchants.map(() => 0),
                datasets: [{
                    data: values,
                    backgroundColor: [
                        ...bgColour,
                    ],

                }]
            }} />
    </>
}