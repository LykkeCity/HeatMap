namespace Lykke.HeatMap {

    
    export interface IOvershootContract {
        index : IOvershoot,
        parts : IOvershoot[]
    }

    export interface IOvershoot {
        assetId: string;
        thresholds: IOvershootThreshold[];
    }

    export interface IOvershootThreshold {
        percent: number;
        delta: number;
        direction: string;
    }

}