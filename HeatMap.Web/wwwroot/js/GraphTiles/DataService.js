var Lykke;
(function (Lykke) {
    var GraphTiles;
    (function (GraphTiles) {
        var DataService = /** @class */ (function () {
            function DataService() {
            }
            DataService.getAssets = function (callback) {
                Lykke.Ajax.get('/api/dictionaries/assets')
                    .then(function (r) {
                    callback(r);
                });
            };
            DataService.getAssetsData = function (callback) {
                Lykke.Ajax.get('/api/data').then(function (r) {
                    callback(r);
                });
            };
            return DataService;
        }());
        GraphTiles.DataService = DataService;
    })(GraphTiles = Lykke.GraphTiles || (Lykke.GraphTiles = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=DataService.js.map