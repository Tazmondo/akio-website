class RequestHandler{
    static Get(url : string, callback : Function): void {
        const requestHandler : XMLHttpRequest = new XMLHttpRequest();

        requestHandler.addEventListener('loadend', () => {
            const response = JSON.parse(requestHandler.responseText);
            callback(response);
        })

        requestHandler.open('GET', url);
        requestHandler.send();
    }


    static Post(url : string, headers : {[header : string] : any}, callback : Function): void {
        const requestHandler : XMLHttpRequest = new XMLHttpRequest();
        
        requestHandler.addEventListener('loadend', () => {
            const response = JSON.parse(requestHandler.responseText);
            callback(response);
        })

        requestHandler.open('POST', url);

        for (let header in headers){
            requestHandler.setRequestHeader(header, headers[header]);
        }

        requestHandler.send();
    }


    static Put(url : string, headers : {[header : string] : string}, callback : Function): void {
        {}
    }
};


export default RequestHandler;