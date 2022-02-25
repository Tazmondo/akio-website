class RequestHandler{
    static Post(url : string, headers : {[header : string] : string}, callback : Function): void {
        {}
    }

    static Get(url : string, callback : Function): void {
        const requestHandler : XMLHttpRequest = new XMLHttpRequest();

        requestHandler.addEventListener('loadend', () => {
            const response = JSON.parse(requestHandler.responseText);
            callback(response);
        })

        requestHandler.open('GET', url);
        requestHandler.send()
    }


    static Put(url : string, headers : {[header : string] : string}, callback : Function): void {
        {}
    }
};


export default RequestHandler;