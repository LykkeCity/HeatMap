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
}