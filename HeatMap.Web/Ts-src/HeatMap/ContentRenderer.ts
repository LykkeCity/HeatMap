namespace Lykke.HeatMap {

    export class ContentRenderer {

        static GenerateCanvas(w:number, h:number, canvasId:string):string{
            return '<canvas id="'+canvasId+'" width="'+w+'" height="'+h+'"></canvas>';
        }
        
        private static getSubDelta(lowValue:number,  hiValue:number, value:number):number {
            if (hiValue == lowValue)
                return 0;
            
            hiValue = hiValue-lowValue;
            value = value - lowValue;
            
            return  value / hiValue;
        }
        
        private static getColourComponent(from:number, to:number, c:number):number{
            let d = to -from;
            
            let result = from + d*c;
            if (result>255)
                result = 255;
            
            return result;
        }
        
        static getDeltaColour(delta:number):string{
            
            if (delta>1)
                delta = 1;
                
            let r = ContentRenderer.getColourComponent(0.0,255, delta);
            let g =ContentRenderer.getColourComponent(200,0.0, delta);
            let b =0;

            if (r>255)
                r=255;

            if (g>255)
                g=255;
            /*
            // red to orange
            if (delta<0.16){
                let s_delta = ContentRenderer.getSubDelta(0, 0.16, delta);
                r = 255;
                g = ContentRenderer.getColourComponent(0,165, s_delta);
            }
            else // orange to yellow
            if (delta<0.33){
                let s_delta = ContentRenderer.getSubDelta(0.16, 0.33, delta);
                r = 255;
                g =   ContentRenderer.getColourComponent(165,255, s_delta);
            }
            else // yellow to green
            if (delta<0.49){
                let s_delta = ContentRenderer.getSubDelta(0.33, 0.49, delta);
                r = ContentRenderer.getColourComponent(255, 0, s_delta);
                g = 255;

            }
            else // green to blue
            if (delta<0.66){
                let s_delta = ContentRenderer.getSubDelta(0.49, 0.66, delta);
                r = 0;
                g = ContentRenderer.getColourComponent(255, 131, s_delta);
                b = ContentRenderer.getColourComponent(0, 255, s_delta);

            }
            else // green to indigo
            if (delta<0.83){
                let s_delta = ContentRenderer.getSubDelta(0.66, 0.83, delta);
                r = 0;
                g = ContentRenderer.getColourComponent(131, 0, s_delta);
                b = 255;
            }
            else // indigo to violet
            if (delta<1){
                let s_delta = ContentRenderer.getSubDelta(0.83, 1, delta);
                r = ContentRenderer.getColourComponent(0, 148, s_delta);
                g = 0;
                b = ContentRenderer.getColourComponent(255, 211, s_delta);
            }
            else       
            {
                r = 148;
                g = 0;
                b = 211;
            }
*/
            return Utils.toHex(r)+Utils.toHex(g)+Utils.toHex(b);
            
        }
        
        static GetFontSize(w:number, h:number):string{
            if (h<=105)
                return "4px";
            
            return "8px";
        }
        
        static DrawParts(cnv:MyCanvas,data:IOvershoot[]):void{
            let amountOnLine = Utils.round(Math.sqrt(data.length), 0);

            let cnt = cnv.canvasWidth*0.5;
            
            let ww = cnt/amountOnLine;
            let hh = cnv.canvasHeight/amountOnLine;
            
            let x = 0;
            let y = 0;
            
            for(let i=0; i<data.length; i++) {
                cnv.setWorkingRect(cnt+x*ww, y*hh, ww,hh);
                this.DrawThresholdLayers(cnv, data[i]);
                
                x++;
                if (x>=amountOnLine){
                    y++;
                    x=0;
                }
            }
        }
        
        
        static getActiveOvershoot(cnv:MyCanvas, data:IOvershootContract):IOvershoot{
            
            if (cnv.mouseX == undefined || cnv.mouseY == undefined)
                return undefined;
            
            let xc = cnv.canvasWidth*0.5;
            
            if (cnv.mouseX<xc){
                return data.index;
            }

            let amountOnLine = Utils.round(Math.sqrt(data.parts.length), 0);
            let w =xc/amountOnLine;
            let h =cnv.canvasHeight/amountOnLine;
            
            
            let x = Utils.trunc((cnv.mouseX - xc) / w) ;
            let y = Utils.trunc(cnv.mouseY / h) ;
            
            return data.parts[y*amountOnLine + x];
                
        }
        
        static DrawContent(cnv:MyCanvas, data:IOvershootContract){

            cnv.setWorkingRectAllCanvas();
            cnv.clearAll();


            cnv.setWorkingRect(0,0, cnv.canvasWidth*0.5, cnv.canvasHeight);
            this.DrawThresholdLayers(cnv, data.index);
           
            this.DrawParts(cnv, data.parts);

            this.DrawMouseOverContent(cnv, data);
            
        }
        
        static DrawMouseOverContent(cnv:MyCanvas, data:IOvershootContract) {

            if (cnv.mouseX == undefined || cnv.mouseY == undefined)
                return;

            let active = this.getActiveOvershoot(cnv, data);

            if (!active)
                return;

            cnv.setWorkingRectAllCanvas();

            let cent = cnv.canvasWidth * 0.5;

            let pad = 10;

            let x: number = cent + pad;
            let y: number = cnv.mouseY - pad*2;
            let w: number = 250;
            let h: number = cnv.canvasHeight - 100;


            if (cnv.mouseX > cnv.canvasWidth * 0.5) {
                x = cnv.mouseX  - w - pad*5;
            }

            if (y + h > cnv.canvasHeight) {
                y = cnv.canvasHeight - pad - h;
            }

            if (y < 0) {
                y = 0;
            }
            let top = y;

            cnv.setShadow(0, 0, 20, 'black');

            cnv.drawRoundRect(x, y, w, h, 5, 'rgba(255,255,255,0.8)');

            cnv.setWorkingRect(x + 5, y + 5, w - 10, w - 10);
            this.DrawThresholdLayers(cnv, active);
            
            cnv.setLineWidth(1);
            cnv.setStrokeStyle("gray");
            cnv.setFillStyle("black");
            
            y = w+2;
            cnv.beginPath();
            cnv.moveTo(5, y);
            cnv.lineTo(w-10, y);
            cnv.stroke();
            
            cnv.setTextSize(12);
            y = y+12;
            cnv.setTextHorizontalAlign("left");
            cnv.fillText("Shape Ratio: 1.2",5, y);
            cnv.setTextHorizontalAlign("right");
            cnv.fillText("Weight: "+active.weight.toFixed(4)+"%",w-10, y);
            y = y+15;
            cnv.fillText("Annual volatility: 12%",w-10, y);
            y = y+15;
            cnv.beginPath();
            cnv.moveTo(5, y);
            cnv.lineTo(w-10, y);
            cnv.stroke();

            cnv.setWorkingRect(cnv.xOffset-5, top+y, cnv.width+10, h-y);
            this.drawGraph(cnv,active);

        }
        
        
        static DrawThresholdLayers(cnv:MyCanvas, data: IOvershoot):void {
            let center_w = 60;
            let center_h = 30;
            let r = 5;
            
            if (cnv.height<300){
                center_w = 35;
                center_h = 20;
                r = 4;
            }
            
            if (cnv.height<200){
                center_w = 35;
                center_h = 20;
                r = 4;
            }
            if (cnv.height<105){
                center_w = 25;
                center_h = 10;
            }


            let cw = (cnv.width-center_w) / data.thresholds.length;
            let ch = (cnv.height-center_h) / data.thresholds.length;

            let cwh = cw * 0.5;
            let chh = ch * 0.5;
            
            let padding=2;

            
            cnv.setShadow(0,0,5, 'rgba(0,0,0,0.5)');
            if (data.thresholds.length == 0){
                cnv.drawRoundRect(padding,
                    padding,
                    cnv.width-padding*2,
                    cnv.height-padding*2, 5, 'gray');
            }
            else
            for(let i=0; i<data.thresholds.length; i++){
                let threshold = data.thresholds[i];

                let color = ContentRenderer.getDeltaColour(Math.abs(threshold.percent));

                cnv.drawRoundRect(padding +i*cwh, 
                    padding+i*chh, 
                    cnv.width-padding*2-i*cwh*2, 
                    cnv.height-padding*2-i*chh*2, 5, '#'+color);
            }

            let cx =cnv.width*0.5;
            cnv.setTextSize(chh - chh*0.5);
            cnv.setTextHorizontalAlign("center");
            cnv.setTextVerticalAlign("middle");
            cnv.clearShadow();
            cnv.setFillStyle('black');
            for (let i=0; i<data.thresholds.length; i++){
                let y = padding+i*chh+chh*0.5;
                let threshold = data.thresholds[i];
                cnv.fillText((threshold.percent*100).toFixed(2)+"%", cx,y );
                
                y = cnv.height-padding-i*chh-chh*0.5;
                cnv.fillText(threshold.delta.toFixed(2)+"δ", cx,y);
                
            } 
      
            let cy = cnv.height*0.5;

            cnv.drawRoundRect( cx- center_w*.5, cy-center_h*0.5, center_w, center_h, r, 'white');
            cnv.setFillStyle('black');
            cnv.fitTextByWidth(data.assetId, cx,cy, center_h-5, center_h);
           
        }
        

        
        static drawGraph(cnv:MyCanvas, data: IOvershoot){

            let result = "";
            if (data.history.length == 0)
                return result;

            let xZoom = cnv.width / data.history.length;

            let max = Utils.max(data.history);
            let min = Utils.min(data.history);

            let maxDeviation = Utils.pips(min, max, data.accuracy);

            let yZoom = Utils.trunc(maxDeviation / cnv.height);

            yZoom = yZoom*1.2;

            let y = cnv.height - Utils.pips(min, data.history[0], data.accuracy) / yZoom;

            cnv.setShadow(0, 0, 5, "rgba(0,0,0,0.4)");
            
            cnv.setFillStyle("green");
            cnv.beginPath();
            cnv.moveTo(0,y);

            for (let i = 1; i < data.history.length; i++) {
                let x = i * xZoom;
                y = cnv.height - Utils.pips(min, data.history[i], data.accuracy) / yZoom;
                cnv.lineTo(x,y);
            }

            cnv.lineTo(cnv.width,y);
            cnv.lineTo(cnv.width,cnv.height);
            cnv.lineTo(0,cnv.height);
            cnv.closePath();
            cnv.fill();
        }
   
        
    }
}