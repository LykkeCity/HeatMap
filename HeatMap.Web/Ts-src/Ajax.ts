namespace Lykke.HeatMap {
    
    export class Ajax {

        static get(url:string, model?:any){
           return $.ajax({url:url, method:'GET', data:model});
        } 
        
        static getAssets(callback: (assets:IAssetPair[])=>void):void{
             this.get('/api/dictionaries/assets')
                 .then(r=>{
                 callback(r);
             });
        }

        static getAssetsData(callback: (assets:IAssetData[])=>void):void{
            this.get('/api/data').then(r=>{
                callback(r);
            });
        }
    }
}
