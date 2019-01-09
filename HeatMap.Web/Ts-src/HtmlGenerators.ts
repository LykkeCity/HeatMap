namespace Lykke.HeatMap {
    
    export class HtmlGenerators {
        
        public static generateAssetPairId(id:string):string{
            return "lykke-asset-pair-"+id;
        }
        
        public static generatePriceId(id:string):string
        {
            return "lykke-price-"+id;
        }

        public static generateAssetGraphDataId(id:string):string
        {
            return "lykke-graph-"+id;
        }
        
        public static generateAssetHtml(assetPair:IAssetPair):string{
            return '<div id='+this.generateAssetPairId(assetPair.id)+' class="asset-pair"><svg style="width: 100%; height: 100%">' +
                '<defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.1)"/>' +
                '<stop offset="100%" stop-color="rgba(255,255,255,0.3)"/></linearGradient></defs>'+
                '<path id="'+this.generateAssetGraphDataId(assetPair.id)+'" fill="url(#linear)"></path>' +
                '<text x="10" y="40" fill="white" class="ap-name">'+assetPair.name+'</text>' +
                '<text x="10" y="70" fill="white" class="ap-percent">+12.45%</text>' +
                '<text id="'+this.generatePriceId(assetPair.id)+'" x="10" y="90" fill="white" class="ap-price"></text></svg></div>';
        }
        
        public static generateAssetChart(ad:IAssetData, asset:IAssetPair,  width:number, height:number):string
        {
            let result = "";
            if (!ad.history)
                return result;

            if (ad.history.length == 0)
                return result;
            
            if (width == 0 || height == 0)
                return result;
            
            let xZoom = width / ad.history.length;
            
            let max = Utils.max(ad.history);
            let min = Utils.min(ad.history);
            
            let maxDeviation = Utils.pips(min, max, asset);
            
            let yZoom = Utils.round( maxDeviation/ height, 0);
            
            if (yZoom === 0)
                yZoom = 1;
            
            //console.log('yZoom '+asset.id+': '+yZoom+"; Deviation: "+maxDeviation+"; Height: "+height);
            
            let y =  height - Utils.pips(min,ad.history[0], asset) / yZoom;

            result += 'M0 '+y.toFixed(0);
            
            for (let i=1; i<ad.history.length; i++){
                let x = i*xZoom;
                
                y = height-Utils.pips(min, ad.history[i], asset) / yZoom;
                result += ' L'+x.toFixed(0)+' '+y.toFixed(0);
            } 
            
            result+=' L'+width.toFixed(0)+' '+y.toFixed(0)+' '+' L'+width.toFixed(0)+' '+height.toFixed(0)+' L0 '+height.toFixed(0)+' Z';
             
            return result;
        }

    }    
}
