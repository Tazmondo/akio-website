class RequestHandler{
    static Get(url : string, callback : Function): void {
        fetch(url).then((response) => response.json())
                  .then(body => callback(body));
    }


    static Post(url : string, headers : {[header : string] : any}, callback : Function): void {
        var requestHeaders : {[header: string] : any} = {};

        for (let header in headers){
            requestHeaders[header] = headers[header];
        }

        fetch(url, {
            method : 'POST',  
            body: JSON.stringify(requestHeaders), 
            headers : {'Content-Type' : 'application/json'}
        }).then((response) => response.json())
          .then((body) => callback(body));
    }
};


export default RequestHandler;