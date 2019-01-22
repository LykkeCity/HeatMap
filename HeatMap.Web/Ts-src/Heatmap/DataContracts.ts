namespace Lykke.HeatMap {

    
    export interface IOvershootContract {
        index : IOvershoot,
        parts : IOvershoot[]
    }

    export interface IOvershoot {
        assetId: string; 
        accuracy : number;
        history: number[];
        thresholds: IOvershootThreshold[];
    }

    export interface IOvershootThreshold {
        percent: number;
        delta: number;
        direction: string;
    }

}