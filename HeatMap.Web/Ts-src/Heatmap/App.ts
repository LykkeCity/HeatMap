namespace Lykke.HeatMap {
    export class App {
        
        private static _leftPanel:IOvershoot; 
        
        static init():void{
            
            if (this._leftPanel)
                return;
            
            DataService.getOvershoots(resp =>{
                this._leftPanel = resp;
                let rootElement = DomElements.getRootElement();
                let layout = HtmlGenerators.GenerateLayout(rootElement.width(), rootElement.height(), resp);
                rootElement.html(layout);
                console.log(layout);
            });
            
        }
        
        static timer():void{
            this.init();
        }
    
    }

    window.addEventListener("load", () => {
        console.log("HeatMap loaded");
        App.timer();
        window.setInterval(() => App.timer(), 5000);
    });
}
