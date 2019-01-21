namespace Lykke.HeatMap {
    export class App {
        
        private static _data:IOvershootContract;

        private static width = 0;
        private static height = 0;
        
        
        private static heatMapId = "heatMapCanvas";
        
        private static myCanvas:MyCanvas;
        
        static releaseMouseEvents():void{
            if (!this.myCanvas)
                return;
            
            this.myCanvas.canvas.onmousemove = undefined;
            this.myCanvas.canvas.onmouseleave = undefined;
        }
        
        static resize():boolean {
            let rootElement = DomElements.getRootElement();
            let newWidth: number = rootElement.offsetWidth;
            let newHeight: number = rootElement.offsetHeight;

            let result = newWidth != this.width || newHeight != this.height;
            if (result) {
                this.width = newWidth;
                this.height = newHeight;
                
                this.releaseMouseEvents();

                rootElement.innerHTML = ContentRenderer.GenerateCanvas(newWidth, newHeight, this.heatMapId);
                this.myCanvas = new MyCanvas(<any>document.getElementById(this.heatMapId), newWidth, newHeight);

                this.myCanvas.canvas.onmousemove = (evnt) => {
                    this.onMouseMove(evnt);
                };
                
                this.myCanvas.canvas.onmouseleave = ()=>{
                    this.onMouseLeave();
                };

                this.drawContent();
            }

            return result;
        }
        
        static onMouseMove(ev: MouseEvent){
            this.myCanvas.mouseX = ev.layerX;
            this.myCanvas.mouseY = ev.layerY;
            this.drawContent();
        }

        static onMouseLeave(){
            this.myCanvas.mouseX = undefined;
            this.myCanvas.mouseY = undefined;
            this.drawContent();
        }
        
        static drawContent(){
            if (this._data)
                ContentRenderer.DrawContent(this.myCanvas, this._data);
        }
        
        static init():void{
            
            DataService.getOvershoots(resp =>{
                this._data = resp;
                this.drawContent();
                
            });
            
        }
        
        static timer():void{
            this.resize();
            
            if (!this._data)
                this.init();
        }
    
    }

    window.addEventListener("load", () => {
        console.log("HeatMap loaded");
        App.timer();
        window.setInterval(() => App.timer(), 1000);
    });
}
