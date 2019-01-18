var Lykke;
(function (Lykke) {
    var HeatMap;
    (function (HeatMap) {
        var DataService = /** @class */ (function () {
            function DataService() {
            }
            DataService.getOvershoots = function (callback) {
                Lykke.Ajax.get('/api/heatmap/overshoot')
                    .then(function (r) {
                    callback(r);
                });
            };
            return DataService;
        }());
        HeatMap.DataService = DataService;
    })(HeatMap = Lykke.HeatMap || (Lykke.HeatMap = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=DataService.js.map