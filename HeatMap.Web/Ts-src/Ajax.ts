namespace Lykke.HeatMap {
    
    export class Ajax {

        static async get(url:string, model?:any){
           return await $.ajax({url:url, method:'GET', data:model});
        } 
        
        
        static async getAssets(){
            return <Lykke.HeatMap.IAssetPair[]>(await this.get('/api/Assets'));
        }

    }
}
