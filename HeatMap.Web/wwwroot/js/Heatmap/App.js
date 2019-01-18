var Lykke;
(function (Lykke) {
    var HeatMap;
    (function (HeatMap) {
        var App = /** @class */ (function () {
            function App() {
            }
            App.init = function () {
                var _this = this;
                if (this._leftPanel)
                    return;
                HeatMap.DataService.getOvershoots(function (resp) {
                    _this._leftPanel = resp;
                    var rootElement = HeatMap.DomElements.getRootElement();
                    rootElement.html(HeatMap.HtmlGenerators.GenerateLayout(rootElement.width(), rootElement.height(), resp));
                });
            };
            App.timer = function () {
                this.init();
            };
            return App;
        }());
        HeatMap.App = App;
        window.addEventListener("load", function () {
            console.log("Heatmap loaded");
            App.timer();
            window.setInterval(function () { return App.timer(); }, 5000);
        });
    })(HeatMap = Lykke.HeatMap || (Lykke.HeatMap = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=App.js.map