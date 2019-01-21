namespace Lykke.HeatMap {

    export class ServiceLocator {


    }


    export class DomElements {
        private static _rootElement: JQuery;
        public static getRootElement(): JQuery {
            if (!this._rootElement)
                this._rootElement = $();

            return this._rootElement;
        }
    }
}

