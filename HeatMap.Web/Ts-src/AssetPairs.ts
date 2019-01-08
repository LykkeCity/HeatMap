
namespace Lykke.HeatMap {
    
    
    
    export class AssetPairs {
        
        private _assets: IAssetPair[];
        
        private async loadAssets(){
            
            this._assets = await Ajax.getAssets();
            this.populateContent();
            this.resize();
        }
        
        
        private populateContent():void{
            let content = "";

            this._assets.forEach(ap=>{
                content += HtmlGenerators.generateAssetHtml(ap);
            });

            domElements.getRootElement().html(content);

            domElements.assetPairs.clear();

            this._assets.forEach(ap=>{
                let el = $('#'+HtmlGenerators.generateAssetPairId(ap));
                domElements.assetPairs.add(ap.id, el);
            });
        }
        
        
        public timer():void
        {
            if (!this._assets)
              this.loadAssets();
        }
        
        public resize():void
        {
            if (!this._assets)
                return;

            this._assets.forEach(ap=>{
                let el = domElements.assetPairs.getValue(ap.id);
                let h = el.height() /3;
                el.attr('style', 'padding-top:'+h+'px');
            });
          
        }

    }
}
