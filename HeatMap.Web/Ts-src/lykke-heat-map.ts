namespace Lykke.HeatMap {

    class app {
        private static n = 0;
        private static width = 0;
        private static height = 0;

        private static resize(): void {
            let rootElement = domElements.getRootElement();
            let newWidth = rootElement.width();
            let newHeight = rootElement.height();

            if (newWidth != this.width || newHeight != this.height) {
                this.width = newWidth;
                this.height = newHeight;
                lykkeServices.assetPairs.resize();
            }
            
        }

        public static timer(): void {
            this.resize();
            lykkeServices.assetPairs.timer();
        }
    }

    lykkeServices.assetPairs = new Lykke.HeatMap.AssetPairs();
    


    
    
    $(()=>{
        app.timer();
        window.setInterval(() => app.timer(), 1000);
    });

}

