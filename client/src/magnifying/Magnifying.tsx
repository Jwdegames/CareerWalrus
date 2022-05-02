import {MagnifiedInterface, MagnifiedCloneInterface, MagnifiedCloneFakeInterface} from "./MagnifyingProps";
import React, {useState} from 'react';
import { AbstractAreaToZoom } from "./MagnifyingClasses";
import "./Magnified.css"
import App from "../App";
import { FileWatcherEventKind } from "typescript";

class AppToZoom extends AbstractAreaToZoom {
    magnified: boolean;
    updateMagnified: Function;
    fake: boolean;
    myRef: React.RefObject<HTMLDivElement>

    constructor(props : MagnifiedCloneFakeInterface) {
        super(props);
        this.magnified = props.magnified
        this.updateMagnified = props.updateMagnified;
        this.fake = props.fake;
        this.myRef = React.createRef();
    }

    render () {
        return <>
            <App magnified = {this.magnified} setMagnified = {this.updateMagnified} fake = {this.fake} Translate = {this.myRef}></App>
        </>;
    }
}

class MagnifiedClone extends React.Component<MagnifiedCloneInterface> {
    //AreaToZoom : React.ReactElement;
    magnified: boolean;
    updateMagnified: Function;

    constructor(props : MagnifiedCloneInterface) {
        super(props);
        //console.log("constructing");
        //this.AreaToZoom = props.AreaToZoom;
        this.magnified = props.magnified
        this.updateMagnified = props.updateMagnified;
    }

    render () {
        //console.log("Rendering");
        return <div className = "magnified-area">
            <AppToZoom magnified = {this.magnified} updateMagnified = {this.updateMagnified} fake = {true}/>
        </div>;
    }
}



export function Magnify() {
    //console.log("initializing");
    const [magnified, setMagnified] = useState(false);
    //console.log("magnified is now " + magnified);
    //console.log("set state")
    let magRef: React.RefObject<HTMLDivElement> = React.createRef();
    let magAreaRef: React.RefObject<HTMLDivElement> = React.createRef();
    let mainAreaRef: React.RefObject<HTMLDivElement> = React.createRef();
    //console.log("Reload called");
    function getMousePos(e: React.MouseEvent) {
        console.log(e.clientX + " , " + e.clientY);
    }



    function moveMagnify(e: React.MouseEvent) {
        let magElement = magRef.current!;
        let magAreaElement = magAreaRef.current!;
        let mainAreaElement = mainAreaRef.current!;
        //getMousePos(e);
        //console.log("Mag window location originally was " + magElement.style.left + "," + magElement.style.top);
        //console.log("Main area size is " + mainAreaElement.offsetWidth + "," + mainAreaElement.offsetHeight);
        let midHeight = magElement.offsetHeight / 2;
        let midWidth = magElement.offsetWidth / 2;
        //console.log("Midheight is " + midHeight);
        let left = (e.clientX - 75) +"px";
        let top = (e.clientY - mainAreaElement.offsetHeight - 75 + window.scrollY) +"px";
        let translation = "translate(" + left + "," + top + ")";
        // let areaTranslation = "translate(" + (mainAreaElement.offsetWidth/2) + "," + (0) + ")";
        //console.log("Moving to " + translation);
        magElement.style.transform =  translation;
        magAreaElement.style.left = "0px";
        magAreaElement.style.top = "0px";

        let xCoord = e.clientX - 20;
        let yCoord = (e.clientY - 20 + window.scrollY);
        //console.log("Scrolling to " + xCoord + "," + yCoord);
        magElement.scrollTo(xCoord*2, yCoord*2);
    }
    //console.log("Making");

    return (
        <div id = "magnify" className = "magnifyable" onMouseMove={moveMagnify} ref = {mainAreaRef}>
            <span className="original-inner">
                <div className="original magnifyable" >
                    <span className="original-inner">
                        <AppToZoom magnified = {magnified} updateMagnified = {setMagnified} fake = {false}/>
                    </span>
                </div>

                <span className = "magnifyable">
                    <div className={"magnified windowed" + (magnified ? "" : " hidden")} ref = {magRef as React.RefObject<HTMLDivElement>}>
                        <div className="copy static" ref = {magAreaRef as React.RefObject<HTMLDivElement>}>
                            <MagnifiedClone magnified = {magnified} updateMagnified = {setMagnified}/>
                        </div>
                    </div>
                </span>
            </span>
        </div>
    );
}