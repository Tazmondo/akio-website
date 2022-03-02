class RequestHandler{
    static async Get(url : string): Promise<any> {
        let response = await fetch(url, {
            credentials: 'include',
        })

        return await response.json()
    }


    static async Post(url : string, headers : {[header : string] : any}): Promise<any> {
        let jsonPayload : {[header: string] : any} = {};

        for (let header in headers){
            jsonPayload[header] = headers[header];
        }

        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(jsonPayload),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        return await response.json()
    }
};


export default RequestHandler;
