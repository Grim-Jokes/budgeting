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
                // TODO: Move this logic over to the API at some point
                // Strip away the confirmation info to avoid duplicating merchants. 
                row = row.replace(/Confirmation #[\d]+/, '').trim();
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
                    merchant: cols[2].replace(/ {2,}/g, ' '),
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