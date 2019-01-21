namespace Lykke.GraphTiles {

    export class AssetPairs {

        private _assets: IAssetPair[];

        assetsLoaded(): boolean {
            return this._assets != undefined;
        }

        private getAssetPair(id: string): IAssetPair {

            for (let i = 0; i < this._assets.length; i++) {
                if (this._assets[i].id == id)
                    return this._assets[i];
            }

            return undefined;
        }

        loadAssets():void {

            DataService.getAssets(assets => {
                this._assets = assets;
                this.populateContent();
                this.resize();
                this.populateAssetData();
            });
        }


        private populateContent(): void {
            let content = "";

            this._assets.forEach(ap => {
                content += HtmlGenerators.generateAssetHtml(ap);
            });

            DomElements.getRootElement().innerHTML = content;

        }



        private populateAssetPrice(ad: IAssetData) {
            let prevData = ServiceLocator.assetData.getValue(ad.id);

            if (prevData && prevData.rate == ad.rate) {
                ServiceLocator.assetData.add(ad.id, ad);
                return;
            }

            let el = document.getElementById(HtmlGenerators.generatePriceId(ad.id));

            let assetPair = this.getAssetPair(ad.id);

            let accuracy = assetPair ? assetPair.accuracy : 5;

            el.innerText= '$ ' + ad.rate.toFixed(accuracy);


            let prevPrice = prevData ? prevData.rate : 0.0;


            el = document.getElementById(HtmlGenerators.generateAssetPairId(ad.id));

            if (prevPrice < ad.rate) {
                el.className = "asset-pair "+ServiceLocator.priceUpAttr;
            }
            else {
                el.className = "asset-pair "+ServiceLocator.priceDownAttr;
            }

            ServiceLocator.assetData.add(ad.id, ad);
        }

        private populateAssetGraph(ad: IAssetData) {

            
            let id =HtmlGenerators.generateAssetPairId(ad.id);
            let elAsset:HTMLElement = document.getElementById(id);
            let asset = this.getAssetPair(ad.id);

            let graph = HtmlGenerators.generateAssetChart(ad, asset, elAsset.offsetWidth, elAsset.offsetHeight);
            //  console.log(graph);
            let el = document.getElementById(HtmlGenerators.generateAssetGraphDataId(ad.id));

            el.setAttribute('d', graph);
        }

          populateAssetData(): void {

            DataService.getAssetsData(assetData => {

                assetData.forEach(ad => {
                    this.populateAssetPrice(ad);
                    this.populateAssetGraph(ad);
                });

            });
        }


        public resize(): void {
            if (!this._assets)
                return;

        }

    }
}
