namespace Lykke.HeatMap {
    
    export class DataService {
        static getOvershoots(callback: (overshoot: IOvershootContract) => void): void {
            Ajax.get('/api/HeatMap/overshoot')
                .then(r => {
                    callback(r);
                });
        }

    }
}