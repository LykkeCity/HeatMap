namespace Lykke.HeatMap {
    export class App {
        
        private static _leftPanel:IOvershoot;

        private static width = 0;
        private static height = 0;
        
        static resize():boolean{
            let rootElement = DomElements.getRootElement();
            let newWidth = rootElement.width();
            let newHeight = rootElement.height();

            let result = newWidth != this.width || newHeight != this.height; 
            if (result) {
                this.width = newWidth;
                this.height = newHeight;
            }
            
            return result;
        }
        
        
        static renderRootElement(){
            this.resize();
            let rootElement = DomElements.getRootElement();
            let layout = HtmlGenerators.GenerateLayout(this.width, this.height, this._leftPanel);
            rootElement.html(layout);
        }
        
        static init():void{
            
            if (this._leftPanel) {
                if (this.resize())
                    this.renderRootElement();
                return;
            }
            
            DataService.getOvershoots(resp =>{
                this._leftPanel = resp;
                this.renderRootElement();
            });
            
        }
        
        static timer():void{
            this.init();
        }
    
    }

    window.addEventListener("load", () => {
        console.log("HeatMap loaded");
        App.timer();
        window.setInterval(() => App.timer(), 1000);
    });
}
