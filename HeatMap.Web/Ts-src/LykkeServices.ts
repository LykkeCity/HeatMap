namespace Lykke.HeatMap {
    
    
    export class lykkeServices {
        public static rootUrl = "https://localhost.5000";
        
        public static priceUpAttr = "price-up";
        public static priceDownAttr = "price-down";

        public static assetPairs:Lykke.HeatMap.AssetPairs;
        
        
        public static readonly assetData : Map<IAssetData> = new Map<IAssetData>();

    }


    export class domElements{
        private static _rootElement:JQuery;
        public  static getRootElement():JQuery{
            if (!this._rootElement)
                this._rootElement = $('.lykke-heat-map');

            return this._rootElement;
        }
    }    
}

