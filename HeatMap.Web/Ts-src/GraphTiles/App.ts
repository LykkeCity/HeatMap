namespace Lykke.GraphTiles {

    class App {
        private static width = 0;
        private static height = 0;

        private static resize(): void {
            let rootElement:any = DomElements.getRootElement();
            let newWidth = rootElement.offsetWidth;
            let newHeight = rootElement.offsetHeight;

            if (newWidth != this.width || newHeight != this.height) {
                this.width = newWidth;
                this.height = newHeight;
                ServiceLocator.assetPairs.resize();
            }
        }

        public static timer(): void {
            this.resize();

            if (ServiceLocator.assetPairs.assetsLoaded())
                ServiceLocator.assetPairs.populateAssetData();
            else
                ServiceLocator.assetPairs.loadAssets();
        }
        
    }

    ServiceLocator.assetPairs = new AssetPairs();

    window.addEventListener("load", () => {
        App.timer();
        window.setInterval(() => App.timer(), 5000);
        console.log("GraphTiles loaded");
    });

}

