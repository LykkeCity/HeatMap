namespace Lykke.HeatMap {

    export class HtmlGenerators {
        

        
        static GenerateLayout(w:number, h:number, data: IOvershootContract):string{
            return '<table style="width: 100%;height: 100%"><tr>' +
                '<td style="width: 50%; padding: 2px;">'+HtmlGenerators.GenerateThresholdLayers(w*0.5, h, data.index)+'</td>' +
                '<td style="width: 50%;">'+HtmlGenerators.GenerateOtherAssets(w*0.5, h, data.parts)+'</td></tr></table>';
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
            let r =0;
            let g =0;
            let b =0;
            
            // red to orange
            if (delta<0.16){
                let s_delta = HtmlGenerators.getSubDelta(0, 0.16, delta);
                r = 255;
                g = HtmlGenerators.getColourComponent(0,165, s_delta);
            }
            else // orange to yellow
            if (delta<0.33){
                let s_delta = HtmlGenerators.getSubDelta(0.16, 0.33, delta);
                r = 255;
                g =   HtmlGenerators.getColourComponent(165,255, s_delta);
            }
            else // yellow to green
            if (delta<0.49){
                let s_delta = HtmlGenerators.getSubDelta(0.33, 0.49, delta);
                r = HtmlGenerators.getColourComponent(255, 0, s_delta);
                g = 255;

            }
            else // green to blue
            if (delta<0.66){
                let s_delta = HtmlGenerators.getSubDelta(0.49, 0.66, delta);
                r = 0;
                g = HtmlGenerators.getColourComponent(255, 131, s_delta);
                b = HtmlGenerators.getColourComponent(0, 255, s_delta);

            }
            else // green to indigo
            if (delta<0.83){
                let s_delta = HtmlGenerators.getSubDelta(0.66, 0.83, delta);
                r = 0;
                g = HtmlGenerators.getColourComponent(131, 0, s_delta);
                b = 255;
            }
            else // indigo to violet
            if (delta<1){
                let s_delta = HtmlGenerators.getSubDelta(0.83, 1, delta);
                r = HtmlGenerators.getColourComponent(0, 148, s_delta);
                g = 0;
                b = HtmlGenerators.getColourComponent(255, 211, s_delta);
            }
            else       
            {
                r = 148;
                g = 0;
                b = 211;
            }

            return Utils.toHex(r)+Utils.toHex(g)+Utils.toHex(b);
            
        }
        

        
        
        static GenerateThresholdLayers(w:number, h:number, data:IOvershoot):string{

            let center_w = 60;
            let center_h = 30;
            let dirsize = 'width:24px';
            
            if (h<200){
                dirsize = 'width:8px';
                center_w = 35;
                center_h = 20;
            }
            if (h<105){
                dirsize = 'width:4px';
                center_w = 25;
                center_h = 10;
            }


            let cw = (w-center_w) / data.thresholds.length;
            let ch = (h-center_h) / data.thresholds.length;

            let cwh = cw * 0.5;
            let chh = ch * 0.5;
   
            let paddingStyle = 'style="width:'+cwh+'px; height:'+chh+'px"';
            
     

            let result = '';
            
            
            
            for(let i=0; i<data.thresholds.length; i++){
                
                let threshold = data.thresholds[i];
   
                let color = HtmlGenerators.getDeltaColour(threshold.delta);
                
                let style='style="width:100%;height:100%; background:#'+color+'"';
                
                result += '<table id="'+data.assetId+'-threshold-0'+i+'" class="threshold" '+style+'">' +
                    '<tr><td '+paddingStyle+'></td><td>'+threshold.percent.toFixed(2)+'%</td><td '+paddingStyle+'></td></tr>' +
                    '<tr><td></td><td>';
            }

            let style='style="width:'+center_w+'px;height: '+center_h+'px; line-height:'+center_h+'px;background:white"';
            result += '<div class="threshold" '+style+'>'+data.assetId+'</div>';
            
            for (let i=data.thresholds.length-1; i>=0; i--){
                let threshold = data.thresholds[i];
                
                result += '</td><td><img src="/images/arrow-'+threshold.direction+'.svg" style="'+dirsize+'"/></td></tr>'+
                    '<tr><td '+paddingStyle+'></td><td>'+threshold.delta.toFixed(2)+'δ</td><td '+paddingStyle+'></td></tr>' +
                    '</table>';
            } 
            
 
            return result;
            
        }

        
        static GetFontSize(w:number, h:number):string{
            if (h<=105)
                return "4px";
            
            return "8px";
        }
        
        static GenerateOtherAssets(w:number, h:number, data:IOvershoot[]):string{
    
            let result = '<table style="width: 100%; height: 100%">';
            
            let amountOnLine = Utils.round(Math.sqrt(data.length), 0);
            let count = 0;
            
            let ww = w/amountOnLine;
            let hh = h/amountOnLine;
            
            console.log("W:"+ww+"; H:"+hh);
            
            let style = 'width:'+ww+'px;height:'+hh+'px; padding:2px';
            
                style += ';font-size:'+this.GetFontSize(ww, hh);
            
            for(let i=0; i<data.length; i++){
                let overshoot = data[i];
                
                if (count == 0)
                    result += '<tr>';
                
                result += '<td style="'+style+'">'+this.GenerateThresholdLayers(ww, hh, overshoot)+'</td>';
                
                count++;
                
                if (count>=amountOnLine){
                    result += '</tr>';
                    count = 0;
                }
                
            }
            
            if (count>0)
                result += '</tr>';
            
            return result+'</table>';
        }
        
    }
}