var Lykke;
(function (Lykke) {
    var GraphTiles;
    (function (GraphTiles) {
        var AssetPairs = /** @class */ (function () {
            function AssetPairs() {
            }
            AssetPairs.prototype.assetsLoaded = function () {
                return this._assets != undefined;
            };
            AssetPairs.prototype.getAssetPair = function (id) {
                for (var i = 0; i < this._assets.length; i++) {
                    if (this._assets[i].id == id)
                        return this._assets[i];
                }
                return undefined;
            };
            AssetPairs.prototype.loadAssets = function () {
                var _this = this;
                GraphTiles.DataService.getAssets(function (assets) {
                    _this._assets = assets;
                    _this.populateContent();
                    _this.resize();
                    _this.populateAssetData();
                });
            };
            AssetPairs.prototype.populateContent = function () {
                var content = "";
                this._assets.forEach(function (ap) {
                    content += GraphTiles.HtmlGenerators.generateAssetHtml(ap);
                });
                GraphTiles.DomElements.getRootElement().html(content);
            };
            AssetPairs.prototype.populateAssetPrice = function (ad) {
                var prevData = GraphTiles.ServiceLocator.assetData.getValue(ad.id);
                if (prevData && prevData.rate == ad.rate) {
                    GraphTiles.ServiceLocator.assetData.add(ad.id, ad);
                    return;
                }
                var el = $('#' + GraphTiles.HtmlGenerators.generatePriceId(ad.id));
                var assetPair = this.getAssetPair(ad.id);
                var accuracy = assetPair ? assetPair.accuracy : 5;
                el.html('$ ' + ad.rate.toFixed(accuracy));
                var prevPrice = prevData ? prevData.rate : 0.0;
                el = $('#' + GraphTiles.HtmlGenerators.generateAssetPairId(ad.id));
                if (prevPrice < ad.rate) {
                    el.removeClass(GraphTiles.ServiceLocator.priceDownAttr);
                    el.addClass(GraphTiles.ServiceLocator.priceUpAttr);
                }
                else {
                    el.removeClass(GraphTiles.ServiceLocator.priceUpAttr);
                    el.addClass(GraphTiles.ServiceLocator.priceDownAttr);
                }
                GraphTiles.ServiceLocator.assetData.add(ad.id, ad);
            };
            AssetPairs.prototype.populateAssetGraph = function (ad) {
                var elAsset = $('#' + GraphTiles.HtmlGenerators.generateAssetPairId(ad.id));
                var asset = this.getAssetPair(ad.id);
                var graph = GraphTiles.HtmlGenerators.generateAssetChart(ad, asset, elAsset.width(), elAsset.height());
                //  console.log(graph);
                var el = $('#' + GraphTiles.HtmlGenerators.generateAssetGraphDataId(ad.id));
                el.attr('d', graph);
            };
            AssetPairs.prototype.populateAssetData = function () {
                var _this = this;
                GraphTiles.DataService.getAssetsData(function (assetData) {
                    assetData.forEach(function (ad) {
                        _this.populateAssetPrice(ad);
                        _this.populateAssetGraph(ad);
                    });
                });
            };
            AssetPairs.prototype.timer = function () {
                if (!this._assets)
                    this.loadAssets();
                else
                    this.populateAssetData();
            };
            AssetPairs.prototype.resize = function () {
                if (!this._assets)
                    return;
            };
            return AssetPairs;
        }());
        GraphTiles.AssetPairs = AssetPairs;
    })(GraphTiles = Lykke.GraphTiles || (Lykke.GraphTiles = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=AssetPairs.js.map