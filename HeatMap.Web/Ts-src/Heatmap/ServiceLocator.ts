namespace Lykke.HeatMap {

    export class ServiceLocator {


    }


    export class DomElements {

        private static rootClass = 'lykke-heatmap';
        
        private static _rootElement: HTMLElement;
        public static getRootElement(): HTMLElement {
            if (!this._rootElement)
                this._rootElement = <HTMLElement>document.getElementsByClassName(this.rootClass)[0];

            return this._rootElement;
        }
    }
}

