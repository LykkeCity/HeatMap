namespace Lykke.HeatMap {
    
    
    export class lykkeServices {
        public static rootUrl = "https://localhost.5000";


        public static assetPairs:Lykke.HeatMap.AssetPairs;

    }


    export class domElements{
        private static _rootElement:JQuery;
        public  static getRootElement():JQuery{
            if (!this._rootElement)
                this._rootElement = $('.lykke-heat-map');

            return this._rootElement;
        }

        public static readonly assetPairs = new Lykke.HeatMap.Map<JQuery>();
    }    
}

