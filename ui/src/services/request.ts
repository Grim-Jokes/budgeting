interface ConnectionParams {
    apiHost: string,
    apiPort: string
}

export type URISegment = 'transactions' | string;
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

    public get<R>(segment: URISegment, queryParams?: { [index: string]: string | number | boolean | void }): Promise<R> {
        const url = this.getUrl(segment, queryParams);
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => result.json())
    }

    public post<W, R>(segment: URISegment, body: W): Promise<R> {
        const url = this.getUrl(segment);
        return fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((result) => result.json())
    }

    private getUrl(segment: URISegment, queryParams?: { [index: string]: string | number | boolean | void }) {
        let url = this.urls.get(segment);
        if (url == null) {
            url = `${this.url}/${segment}`;
            this.urls.set(segment, url);
        }

        let queryFields: string[] = [];
        if (queryParams) {
            const fields = Object.keys(queryParams);
            queryFields = fields.filter((field) => queryParams[field] != null).map((field) => `${field}=${queryParams[field]}`);
        }

        if (queryFields.length > 0) {
            url = url + '?' + queryFields.join('&')
        }

        return url;
    }
}

export const request = Request.instance({
    apiHost: process.env.API_HOST || "localhost",
    apiPort: process.env.API_PORT || '3000'
});


