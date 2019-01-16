namespace Lykke.GraphTiles {
    export class DataService {
        static getAssets(callback: (assets: IAssetPair[]) => void): void {
            Ajax.get('/api/dictionaries/assets')
                .then(r => {
                    callback(r);
                });
        }

        static getAssetsData(callback: (assets: IAssetData[]) => void): void {
            Ajax.get('/api/data').then(r => {
                callback(r);
            });
        }
    }
}