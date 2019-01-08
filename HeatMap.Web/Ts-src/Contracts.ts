namespace Lykke.HeatMap {

    export interface IAssetPair {
        id: string;
        name: string;
        accuracy: number;
    }
    
    
    export interface IAssetData {
        id: string;
        rate: number;
        history:number[];
    }
}
