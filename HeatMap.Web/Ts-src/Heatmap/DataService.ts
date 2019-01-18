namespace Lykke.HeatMap {
    
    export class DataService {
        static getOvershoots(callback: (assets: IOvershoot) => void): void {
            Ajax.get('/api/HeatMap/overshoot')
                .then(r => {
                    callback(r);
                });
        }

    }
}