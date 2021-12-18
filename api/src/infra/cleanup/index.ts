export interface IDisposable {
    dispose(): void;
}

const disposables: IDisposable[] = [];

export function addDisposable(disposable: IDisposable) {
    disposables.push(disposable);
}

export function cleanup() {

    do {
        let disposable: IDisposable | void = disposables.shift();
        if (disposable) {
            disposable.dispose();
        }
    } while (disposables.length > 0)
}

