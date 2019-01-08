namespace Lykke.HeatMap {
    
    export class HtmlGenerators {
        
        public static generateAssetPairId(assetPair:IAssetPair):string{
            return "lykke-asset-pair-"+assetPair.id;
        }
        
        public static generateAssetHtml(assetPair:IAssetPair):string{
            return '<div id='+this.generateAssetPairId(assetPair)+' class="asset-pair"><div class="ap-name">'+assetPair.name+'</div>' +
                '<div class="ap-percent">+12.45%</div><div class="ap-price">$ 123432.34</div></div>';
        }

    }    
}
