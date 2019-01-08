namespace Lykke.HeatMap
{
        
    interface IKeyValue<TValue> {
        key:string;
        value:TValue;
    }
    
    export class Map<TValue>
    {
        private _items:any = {};
        
        
        public add(key:string, value:TValue):void {
            this._items[key] = value;
        }

        public remove(key:string):void {
            delete this._items[key];
        }

        public getValue(key:string):TValue {
            return this._items[key];
        }

        public clear():void {
            this._items = {};
        }
        
        public enumerate(callback:(kvp:IKeyValue<TValue>)=>void):void{
            Object.keys(this._items).forEach(key=>{
                callback({key, value:this.getValue(key)})
            })
        }
        
    }

    
    export class Utils{
        
        public static max(data:number[]):number {

            if (data.length == 1)
                return data[0];
            
            let max= data[0];
            
            for (let i=1; i<data.length; i++)
            {
                if (max<data[i])
                    max = data[i];
            }
            
            return max;
        }

        public static min(data:number[]):number {

            if (data.length == 1)
                return data[0];

            let min= data[0];

            for (let i=1; i<data.length; i++)
            {
                if (min>data[i])
                    min = data[i];
            }

            return min;
        }
        
        public static pips(d1:number, d2:number, ap: IAssetPair):number
        {
            return (d2*Math.pow(10, ap.accuracy)-d1*Math.pow(10, ap.accuracy));
            
            
        }
    }
    
}


