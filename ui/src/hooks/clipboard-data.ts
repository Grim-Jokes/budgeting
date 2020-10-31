import { useCallback, useEffect, useRef, useState } from 'react';

interface PastedData {
    amount: number;
    merchant: string;
    date: string;
}

export function useClipboardData(): PastedData[] | void {
    let data = useRef<PastedData[]>();
    let [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        function handlePaste(ev: ClipboardEvent) {
            let text = ev.clipboardData?.getData("text");
            let rows = text?.trim().split('\n');


            data.current = rows?.map((row) => {
                let cols = row.split(',');
                if (cols.length === 1) {
                    cols = cols[0].split('\t');
                }

                let num = Number.parseFloat(cols[4]);
                if (Number.isNaN(num)) {
                    num = Number.parseFloat(cols[5]);
                } else {
                    if (num > 0)  {
                        num *= -1
                    }
                }
                return {
                    amount: num,
                    merchant: cols[2],
                    date: cols[1],
                }

            });
            forceUpdate();
        }
        document.addEventListener("paste", handlePaste);

        return () => {
            document.removeEventListener("paste", handlePaste);
        }
    }, [data, forceUpdate]);

    return data.current;
}