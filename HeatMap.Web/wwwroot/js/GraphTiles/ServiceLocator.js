var Lykke;
(function (Lykke) {
    var GraphTiles;
    (function (GraphTiles) {
        var ServiceLocator = /** @class */ (function () {
            function ServiceLocator() {
            }
            ServiceLocator.rootUrl = "https://localhost.5000";
            ServiceLocator.priceUpAttr = "price-up";
            ServiceLocator.priceDownAttr = "price-down";
            ServiceLocator.assetData = new Lykke.Map();
            return ServiceLocator;
        }());
        GraphTiles.ServiceLocator = ServiceLocator;
        var DomElements = /** @class */ (function () {
            function DomElements() {
            }
            DomElements.getRootElement = function () {
                if (!this._rootElement)
                    this._rootElement = $('.lykke-tiles');
                return this._rootElement;
            };
            return DomElements;
        }());
        GraphTiles.DomElements = DomElements;
    })(GraphTiles = Lykke.GraphTiles || (Lykke.GraphTiles = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=ServiceLocator.js.map