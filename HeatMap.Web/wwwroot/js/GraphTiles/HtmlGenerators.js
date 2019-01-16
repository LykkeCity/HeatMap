var Lykke;
(function (Lykke) {
    var GraphTiles;
    (function (GraphTiles) {
        var HtmlGenerators = /** @class */ (function () {
            function HtmlGenerators() {
            }
            HtmlGenerators.generateAssetPairId = function (id) {
                return "lykke-asset-pair-" + id;
            };
            HtmlGenerators.generatePriceId = function (id) {
                return "lykke-price-" + id;
            };
            HtmlGenerators.generateAssetGraphDataId = function (id) {
                return "lykke-graph-" + id;
            };
            HtmlGenerators.generateAssetHtml = function (assetPair) {
                return '<div id=' + this.generateAssetPairId(assetPair.id) + ' class="asset-pair"><svg style="width: 100%; height: 100%">' +
                    '<defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.1)"/>' +
                    '<stop offset="100%" stop-color="rgba(255,255,255,0.3)"/></linearGradient></defs>' +
                    '<path id="' + this.generateAssetGraphDataId(assetPair.id) + '" fill="url(#linear)"></path>' +
                    '<text x="10" y="40" fill="white" class="ap-name">' + assetPair.name + '</text>' +
                    '<text x="10" y="70" fill="white" class="ap-percent">+12.45%</text>' +
                    '<text id="' + this.generatePriceId(assetPair.id) + '" x="10" y="90" fill="white" class="ap-price"></text></svg></div>';
            };
            HtmlGenerators.generateAssetChart = function (ad, asset, width, height) {
                var result = "";
                if (!ad.history)
                    return result;
                if (ad.history.length == 0)
                    return result;
                if (width == 0 || height == 0)
                    return result;
                var xZoom = width / ad.history.length;
                var max = Lykke.Utils.max(ad.history);
                var min = Lykke.Utils.min(ad.history);
                var maxDeviation = Lykke.Utils.pips(min, max, asset.accuracy);
                var yZoom = Lykke.Utils.round(maxDeviation / height, 0);
                yZoom++;
                //console.log('yZoom '+asset.id+': '+yZoom+"; Deviation: "+maxDeviation+"; Height: "+height);
                var y = height - Lykke.Utils.pips(min, ad.history[0], asset.accuracy) / yZoom;
                result += 'M0 ' + y.toFixed(0);
                for (var i = 1; i < ad.history.length; i++) {
                    var x = i * xZoom;
                    y = height - Lykke.Utils.pips(min, ad.history[i], asset.accuracy) / yZoom;
                    result += ' L' + x.toFixed(0) + ' ' + y.toFixed(0);
                }
                result += ' L' + width.toFixed(0) + ' ' + y.toFixed(0) + ' ' + ' L' + width.toFixed(0) + ' ' + height.toFixed(0) + ' L0 ' + height.toFixed(0) + ' Z';
                return result;
            };
            return HtmlGenerators;
        }());
        GraphTiles.HtmlGenerators = HtmlGenerators;
    })(GraphTiles = Lykke.GraphTiles || (Lykke.GraphTiles = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=HtmlGenerators.js.map