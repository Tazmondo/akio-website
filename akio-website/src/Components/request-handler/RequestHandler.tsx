class RequestHandler{
    static async Get(url : string): Promise<any> {
        let response = await fetch(url)

        return await response.json()
    }


    static async Post(url : string, headers : {[header : string] : any}): Promise<any> {
        let requestHeaders : {[header: string] : any} = {};

        for (let header in headers){
            requestHeaders[header] = headers[header];
        }

        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestHeaders),
            headers: {'Content-Type': 'application/json'}
        })

        return await response.json()
    }
};


export default RequestHandler;