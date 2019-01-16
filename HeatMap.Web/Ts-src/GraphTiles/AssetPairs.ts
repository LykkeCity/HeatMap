namespace Lykke.GraphTiles {

    export class AssetPairs {

        private _assets: IAssetPair[];


        assetsLoaded(): boolean {
            return this._assets != undefined;
        }

        private getAssetPair(id: string): IAssetPair {

            for (var i = 0; i < this._assets.length; i++) {
                if (this._assets[i].id == id)
                    return this._assets[i];
            }

            return undefined;
        }

        private loadAssets() {

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

            DomElements.getRootElement().html(content);

        }



        private populateAssetPrice(ad: IAssetData) {
            let prevData = ServiceLocator.assetData.getValue(ad.id);

            if (prevData && prevData.rate == ad.rate) {
                ServiceLocator.assetData.add(ad.id, ad);
                return;
            }

            let el = $('#' + HtmlGenerators.generatePriceId(ad.id));

            let assetPair = this.getAssetPair(ad.id);

            let accuracy = assetPair ? assetPair.accuracy : 5;

            el.html('$ ' + ad.rate.toFixed(accuracy));


            let prevPrice = prevData ? prevData.rate : 0.0;


            el = $('#' + HtmlGenerators.generateAssetPairId(ad.id));

            if (prevPrice < ad.rate) {
                el.removeClass(ServiceLocator.priceDownAttr);
                el.addClass(ServiceLocator.priceUpAttr);
            }
            else {
                el.removeClass(ServiceLocator.priceUpAttr);
                el.addClass(ServiceLocator.priceDownAttr);
            }

            ServiceLocator.assetData.add(ad.id, ad);
        }

        private populateAssetGraph(ad: IAssetData) {

            let elAsset = $('#' + HtmlGenerators.generateAssetPairId(ad.id));
            let asset = this.getAssetPair(ad.id);

            let graph = HtmlGenerators.generateAssetChart(ad, asset, elAsset.width(), elAsset.height());
            //  console.log(graph);
            let el = $('#' + HtmlGenerators.generateAssetGraphDataId(ad.id));

            el.attr('d', graph);

        }

        private populateAssetData(): void {

            DataService.getAssetsData(assetData => {

                assetData.forEach(ad => {
                    this.populateAssetPrice(ad);
                    this.populateAssetGraph(ad);
                });

            });
        }

        public timer(): void {
            if (!this._assets)
                this.loadAssets();
            else
                this.populateAssetData();
        }

        public resize(): void {
            if (!this._assets)
                return;

        }

    }
}
