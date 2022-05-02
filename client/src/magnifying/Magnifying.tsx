import {MagnifiedInterface} from "./MagnifyingProps";
import React, {useState} from 'react';
import { classicNameResolver } from "typescript";
import "./Magnified.css"

class MagnifiedClone extends React.Component<MagnifiedInterface> {
    AreaToZoom : React.ReactElement;

    constructor(props : MagnifiedInterface) {
        super(props);
        this.AreaToZoom = props.AreaToZoom;
    }

    render () {
        return <>
            {React.cloneElement(this.AreaToZoom,{
                className: "magnified-area",
            })}
        </>;
    }
}

export function Magnify({AreaToZoom} : MagnifiedInterface) {
    const [mousePos, setMousePos] = useState([50,50]);
    let magRef: React.RefObject<HTMLDivElement> = React.createRef();
    let magAreaRef: React.RefObject<HTMLDivElement> = React.createRef();
    let mainAreaRef: React.RefObject<HTMLDivElement> = React.createRef();
    console.log("Reload called");
    function getMousePos(e: React.MouseEvent) {
        console.log(e.clientX + " , " + e.clientY);
    }

    function moveMagnify(e: React.MouseEvent) {
        let magElement = magRef.current!;
        let magAreaElement = magAreaRef.current!;
        let mainAreaElement = mainAreaRef.current!;
        getMousePos(e);
        //console.log("Mag window location originally was " + magElement.style.left + "," + magElement.style.top);
        console.log("Main area size is " + mainAreaElement.offsetWidth + "," + mainAreaElement.offsetHeight);
        let midHeight = magElement.offsetHeight / 2;
        let midWidth = magElement.offsetWidth / 2;
        //console.log("Midheight is " + midHeight);
        let left = (e.clientX - 75) +"px";
        let top = (e.clientY - mainAreaElement.offsetHeight - 75 + window.scrollY) +"px";
        let translation = "translate(" + left + "," + top + ")";
        // let areaTranslation = "translate(" + (mainAreaElement.offsetWidth/2) + "," + (0) + ")";
        console.log("Moving to " + translation);
        magElement.style.transform =  translation;
        magAreaElement.style.left = "0px";
        magAreaElement.style.top = "0px";

        let xCoord = e.clientX - 20;
        let yCoord = (e.clientY - 20 + window.scrollY);
        console.log("Scrolling to " + xCoord + "," + yCoord);
        magElement.scrollTo(xCoord*2, yCoord*2);
    }

    return (
        <div id = "magnify" className = "magnifyable" onMouseMove={moveMagnify} ref = {mainAreaRef}>
            <span className="original-inner">
                <div className="original magnifyable" >
                    <span className="original-inner">
                        {React.cloneElement(AreaToZoom)}
                    </span>
                </div>

                <span className = "magnifyable">
                    <div className="magnified windowed" ref = {magRef as React.RefObject<HTMLDivElement>}>
                        <div className="copy static" ref = {magAreaRef as React.RefObject<HTMLDivElement>}>
                            <MagnifiedClone AreaToZoom = {AreaToZoom}/>
                        </div>
                    </div>
                </span>
            </span>
        </div>
    );
}