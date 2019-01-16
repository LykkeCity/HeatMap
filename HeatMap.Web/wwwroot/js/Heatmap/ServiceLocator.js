var Lykke;
(function (Lykke) {
    var HeatMap;
    (function (HeatMap) {
        var ServiceLocator = /** @class */ (function () {
            function ServiceLocator() {
            }
            return ServiceLocator;
        }());
        HeatMap.ServiceLocator = ServiceLocator;
        var DomElements = /** @class */ (function () {
            function DomElements() {
            }
            DomElements.getRootElement = function () {
                if (!this._rootElement)
                    this._rootElement = $('.lykke-heatmap');
                return this._rootElement;
            };
            return DomElements;
        }());
        HeatMap.DomElements = DomElements;
    })(HeatMap = Lykke.HeatMap || (Lykke.HeatMap = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=ServiceLocator.js.map