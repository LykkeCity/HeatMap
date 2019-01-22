namespace Lykke.GraphTiles {

    export class ServiceLocator {
        public static rootUrl = "https://localhost.5000";

        public static priceUpAttr = "price-up";
        public static priceDownAttr = "price-down";

        public static assetPairs: AssetPairs;


        public static readonly assetData: Map<IAssetData> = new Map<IAssetData>();

    }


    export class DomElements {
        
        private static rootClassName = 'lykke-tiles';
        
        private static _rootElement: Element;
        public static getRootElement(): Element {

            if (!this._rootElement)
                this._rootElement = document.getElementsByClassName(this.rootClassName)[0];

            return this._rootElement;
        }
    }
}

