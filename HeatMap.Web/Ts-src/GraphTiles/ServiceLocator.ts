namespace Lykke.GraphTiles {

    export class ServiceLocator {
        public static rootUrl = "https://localhost.5000";

        public static priceUpAttr = "price-up";
        public static priceDownAttr = "price-down";

        public static assetPairs: AssetPairs;


        public static readonly assetData: Map<IAssetData> = new Map<IAssetData>();

    }


    export class DomElements {
        private static _rootElement: JQuery;
        public static getRootElement(): JQuery {

            if (!this._rootElement)
                this._rootElement = $('.lykke-tiles');


            return this._rootElement;
        }
    }
}

