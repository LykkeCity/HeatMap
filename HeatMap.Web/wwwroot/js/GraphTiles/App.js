var Lykke;
(function (Lykke) {
    var GraphTiles;
    (function (GraphTiles) {
        var App = /** @class */ (function () {
            function App() {
            }
            App.resize = function () {
                var rootElement = GraphTiles.DomElements.getRootElement();
                var newWidth = rootElement.width();
                var newHeight = rootElement.height();
                if (newWidth != this.width || newHeight != this.height) {
                    this.width = newWidth;
                    this.height = newHeight;
                    GraphTiles.ServiceLocator.assetPairs.resize();
                }
            };
            App.timer = function () {
                this.resize();
                if (GraphTiles.ServiceLocator.assetPairs.assetsLoaded())
                    GraphTiles.ServiceLocator.assetPairs.populateAssetData();
                else
                    GraphTiles.ServiceLocator.assetPairs.loadAssets();
            };
            App.width = 0;
            App.height = 0;
            return App;
        }());
        GraphTiles.ServiceLocator.assetPairs = new GraphTiles.AssetPairs();
        window.addEventListener("load", function () {
            App.timer();
            window.setInterval(function () { return App.timer(); }, 5000);
            console.log("GraphTiles loaded");
        });
    })(GraphTiles = Lykke.GraphTiles || (Lykke.GraphTiles = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=App.js.map