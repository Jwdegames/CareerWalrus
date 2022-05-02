/**
 * Interface for the Magnifiyng Glass
 */
 export interface MagnifiedInterface{
    AreaToZoom: React.ReactElement;
    
}

export interface MagnifiedCloneInterface{
    //AreaToZoom: React.ReactElement;
    magnified: boolean;
    updateMagnified: Function;
}

export interface MagnifiedCloneFakeInterface{
    //AreaToZoom: React.ReactElement;
    magnified: boolean;
    updateMagnified: Function;
    fake: boolean;
}



