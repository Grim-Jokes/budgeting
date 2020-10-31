import { createJSDocThisTag } from "typescript";

interface ConnectionParams {
    apiHost: string,
    apiPort: string
}

export type URISegment = 'transactions';
export type URL = string;


export class Request {
    private apiHost: string;
    private apiPort: string;
    private url: string;
    private urls = new Map<URISegment, URL>();

    private constructor(connectionParams: ConnectionParams) {
        this.apiHost = connectionParams.apiHost;
        this.apiPort = connectionParams.apiPort;
        if (!this.apiPort) {
            this.url = `http://${this.apiHost}/api/v1`
        } else {
            this.url = `http://${this.apiHost}:${this.apiPort}/api/v1`
        }
    }

    public static instance(connectionParams: ConnectionParams) {
        return new Request(connectionParams);
    }

    public get<R>(segment: URISegment): Promise<R> {
        let url = this.urls.get(segment);
        if (url == null) {
            url = `${this.url}/${segment}`;
            this.urls.set(segment, url);
        }

        return fetch(url).then((result) => result.json())
    }
}

export const request = Request.instance({
    apiHost: process.env.API_HOST || "localhost",
    apiPort: process.env.API_PORT || '3000'
});


