namespace Lykke.GraphTiles {

    class App {
        private static width = 0;
        private static height = 0;

        private static resize(): void {
            let rootElement = DomElements.getRootElement();
            let newWidth = rootElement.width();
            let newHeight = rootElement.height();

            if (newWidth != this.width || newHeight != this.height) {
                this.width = newWidth;
                this.height = newHeight;
                ServiceLocator.assetPairs.resize();
            }
        }

        public static timer(): void {
            this.resize();
            ServiceLocator.assetPairs.timer();
        }
    }

    ServiceLocator.assetPairs = new AssetPairs();

    window.addEventListener("load", () => {
        App.timer();
        window.setInterval(() => App.timer(), 5000);
        console.log("GraphTiles loaded");
    });

}

