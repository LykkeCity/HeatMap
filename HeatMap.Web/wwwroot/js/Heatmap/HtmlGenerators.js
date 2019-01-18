var Lykke;
(function (Lykke) {
    var HeatMap;
    (function (HeatMap) {
        var HtmlGenerators = /** @class */ (function () {
            function HtmlGenerators() {
            }
            HtmlGenerators.GenerateLayout = function (w, h, left) {
                return '<table style="width: 100%;height: 100%"><tr>' +
                    '<td style="width: 50%;">' + HtmlGenerators.GenerateThresholdLayers(w * 0.5, h, left) + '</td><td style="width: 50%;"></td></tr></table>';
            };
            HtmlGenerators.getSubDelta = function (lowValue, hiValue, value) {
                if (hiValue == lowValue)
                    return 0;
                hiValue = hiValue - lowValue;
                value = value - lowValue;
                return value / hiValue;
            };
            HtmlGenerators.getColourComponent = function (from, to, c) {
                var d = to - from;
                var result = from + d * c;
                if (result > 255)
                    result = 255;
                return result;
            };
            HtmlGenerators.getDeltaColour = function (delta) {
                var r = 0;
                var g = 0;
                var b = 0;
                // red to orange
                if (delta < 0.16) {
                    var s_delta = HtmlGenerators.getSubDelta(0, 0.16, delta);
                    r = 255;
                    g = HtmlGenerators.getColourComponent(0, 165, s_delta);
                }
                else // orange to yellow
                 if (delta < 0.33) {
                    var s_delta = HtmlGenerators.getSubDelta(0.16, 0.33, delta);
                    r = 255;
                    g = HtmlGenerators.getColourComponent(165, 255, s_delta);
                }
                else // yellow to green
                 if (delta < 0.49) {
                    var s_delta = HtmlGenerators.getSubDelta(0.33, 0.49, delta);
                    r = HtmlGenerators.getColourComponent(255, 0, s_delta);
                    g = 255;
                }
                else // green to blue
                 if (delta < 0.66) {
                    var s_delta = HtmlGenerators.getSubDelta(0.49, 0.66, delta);
                    r = 0;
                    g = HtmlGenerators.getColourComponent(255, 131, s_delta);
                    b = HtmlGenerators.getColourComponent(0, 255, s_delta);
                }
                else // green to indigo
                 if (delta < 0.83) {
                    var s_delta = HtmlGenerators.getSubDelta(0.66, 0.83, delta);
                    r = 0;
                    g = HtmlGenerators.getColourComponent(131, 0, s_delta);
                    b = 255;
                }
                else // indigo to violet
                 if (delta < 1) {
                    var s_delta = HtmlGenerators.getSubDelta(0.83, 1, delta);
                    r = HtmlGenerators.getColourComponent(0, 148, s_delta);
                    g = 0;
                    b = HtmlGenerators.getColourComponent(255, 211, s_delta);
                }
                else {
                    r = 148;
                    g = 0;
                    b = 211;
                }
                var result = Lykke.Utils.toHex(r) + Lykke.Utils.toHex(g) + Lykke.Utils.toHex(b);
                console.log(delta + "=#" + result);
                console.log("R:" + r + "; G:" + g + "; B:" + b);
                return result;
            };
            HtmlGenerators.GenerateThresholdLayers = function (w, h, data) {
                var center_w = 60;
                var center_h = 30;
                var cw = (w - center_w) / data.thresholds.length;
                var ch = (h - center_h) / data.thresholds.length;
                var chh = ch * 0.5;
                var result = '';
                for (var i_1 = 0; i_1 < data.thresholds.length; i_1++) {
                    var threshold = data.thresholds[i_1];
                    var lh = h - ch * i_1;
                    var bh = h - ch * (i_1 + 1);
                    var lw = w - cw * i_1;
                    var top_1 = 0;
                    if (i_1 > 0)
                        top_1 = -h * i_1 + chh * i_1 * i_1;
                    var color = HtmlGenerators.getDeltaColour(threshold.delta);
                    var style_1 = 'style="top:' + top_1 + 'px; left:' + (cw * 0.5 * i_1) + 'px; width:' + lw + 'px;height: ' + lh + 'px; background:#' + color + '"';
                    //style +='; padding: 0 '+(cw*0.5)+'px"';
                    result += '<div id="' + data.assetId + '-threshold-0' + lw + '" class="threshold"' + style_1 + '>' +
                        '<div class="percent" style="line-height: ' + chh + 'px;height:' + chh + 'px">' + threshold.percent.toFixed(2) + '%</div>' +
                        '<div class="direction" style="text-align: right; line-height: ' + bh + 'px;height:' + bh + 'px"><img src="/images/arrow-' + threshold.direction + '.svg" style="width:24px"/></div>' +
                        '<div class="percent" style="line-height: ' + chh + 'px; height:' + chh + 'px">' + threshold.delta + 'δ</div></div>';
                }
                var i = data.thresholds.length;
                var top = 0;
                if (i > 0)
                    top = -h * i + chh * i * i;
                var style = 'style="top:' + top + 'px; left:' + (cw * 0.5 * data.thresholds.length) + 'px; width:' + center_w + 'px;height: ' + center_h + 'px; line-height:' + center_h + 'px;background:white"';
                result += '<div class="threshold" ' + style + '>' + data.assetId + '</div>';
                return result;
            };
            HtmlGenerators.GenerateOtherAssets = function (w, h, data) {
                return '<table style="width: 100%; height: 100%">' +
                    '<tr><td></td><td></td><td></td></tr></table>';
            };
            return HtmlGenerators;
        }());
        HeatMap.HtmlGenerators = HtmlGenerators;
    })(HeatMap = Lykke.HeatMap || (Lykke.HeatMap = {}));
})(Lykke || (Lykke = {}));
//# sourceMappingURL=HtmlGenerators.js.map