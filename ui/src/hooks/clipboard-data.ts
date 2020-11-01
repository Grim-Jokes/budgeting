import { useEffect, useState } from 'react';

export interface PastedData {
    amount: number;
    merchant: string;
    date: string;
}

type ClearFn = () => void;

export function useClipboardData(): [PastedData[], ClearFn] {
    let [data, setData] = useState<PastedData[]>([]);

    useEffect(() => {
        function handlePaste(ev: ClipboardEvent) {
            let text = ev.clipboardData?.getData("text");
            let rows = text?.trim().split('\n');


            let mappedRows: PastedData[] | void = rows?.map((row) => {
                let cols = row.split(',');
                if (cols.length === 1) {
                    cols = cols[0].split('\t');
                }

                let num = Number.parseFloat(cols[4]);
                if (Number.isNaN(num)) {
                    num = Number.parseFloat(cols[5]);
                } else {
                    if (num > 0) {
                        num *= -1
                    }
                }
                return {
                    amount: num,
                    merchant: cols[2],
                    date: cols[1],
                }

            });

            setData(mappedRows || []);
        }

        document.addEventListener("paste", handlePaste);

        return () => {
            document.removeEventListener("paste", handlePaste);
        }
    }, [data]);

    function clear() {
        setData([]);
    }

    return [data, clear];
}