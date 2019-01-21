namespace Lykke {
    
    
    export class AjaxPromise
    {
        
        private readonly xhttp:XMLHttpRequest;
        private _okCallback:(result?, xhttp?:XMLHttpRequest)=>void;
        private _failCallback:(xhttp?:XMLHttpRequest)=>void;
        constructor(method:string, url:string) {
            this.xhttp = new XMLHttpRequest();
            this.xhttp.open(method, url, true);
            this.xhttp.send();
            this.xhttp.onreadystatechange = () => {
                if (this.xhttp.readyState == 4) {
                    if (this.xhttp.status >= 200 && this.xhttp.status <= 299)
                        this.handleOk(this.xhttp.response);
                    else
                        this.handleFail();
                }
            };
        }
        
        private handleOk(result):void
        {
            try
            {
                if (this._okCallback)
                    this._okCallback(JSON.parse(result), this.xhttp);
            }
            finally {
                this.xhttp.onreadystatechange = undefined;
            }
            
        }

        private handleFail():void
        {
            try
            {
                if (this._failCallback)
                    this._failCallback(this.xhttp);
   
            }
            finally {
              this.xhttp.onreadystatechange = undefined;
            }

        }

        then(callback:(result)=>void):AjaxPromise{
            this._okCallback = callback;
            return this;
        }

        fail(callback:(result)=>void):AjaxPromise{
            this._failCallback = callback;
            return this;
        }
        
    }
    

    export class Ajax {
        static get(url: string):AjaxPromise {
            return new AjaxPromise("GET", url);
        }
    }
}
