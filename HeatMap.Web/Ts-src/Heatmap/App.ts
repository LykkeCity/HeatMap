namespace Lykke.HeatMap {
    export class App {
        
        private static _leftPanel:IOvershoot; 
        
        static init():void{
            
            if (this._leftPanel)
                return;
            
            DataService.getOvershoots(resp =>{
                this._leftPanel = resp;
                let rootElement = DomElements.getRootElement();
                rootElement.html(HtmlGenerators.GenerateLayout(rootElement.width(), rootElement.height(), resp));
            });
            
        }
        
        static timer():void{
            this.init();
        }
    
    }

    window.addEventListener("load", () => {
        console.log("Heatmap loaded");
        App.timer();
        window.setInterval(() => App.timer(), 5000);
    });
}
