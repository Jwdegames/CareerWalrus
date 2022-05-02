import {MagnifiedCloneFakeInterface, MagnifiedCloneInterface} from "./MagnifyingProps";
import React from "react";

export class AbstractAreaToZoom extends React.Component<MagnifiedCloneFakeInterface> {
    constructor (props : MagnifiedCloneFakeInterface) {
        super(props);
        // Prevent this class from being directly made, need to extend it first
        if (this.constructor == AbstractAreaToZoom) {
            throw new Error("AbstractAreaToZoom is abstract and should not be instantiated");
        }
    }
    
    render () {
        throw new Error("render() is abstract and should not be called");
        return <></>;
    }
}