import {MagnifiedInterface} from "./MagnifyingProps";
import React, {Component} from 'react';
import { classicNameResolver } from "typescript";
import "./Magnified.css"

export function Magnify({AreaToZoom} : MagnifiedInterface) {

    function getMousePos(e: React.MouseEvent) {
        console.log(e.clientX + " , " + e.clientY);
    }

    return (
        <div id = "magnify" className = "magnifyable">
             <span className="original-inner">

            <div className="original magnifyable" onMouseMove={getMousePos}>
                <div className="az-overly az-overlay"></div>
                <span className="original-inner">
                    {React.cloneElement(AreaToZoom)}
                </span>
            </div>

            <div className="magnified windowed">
                <div className="copy magnifyable">
                    {React.cloneElement(AreaToZoom)}
                </div>
            </div>

            </span>
        </div>
    );
}
// Makes a magnified element
/*
export class Magnified extends React.Component<MagnifiedInterface> {
    magnifiedArea? : React.ReactElement;
    areaToZoom : string = "";
    mouseX : number = 0;
    mouseY : number = 0;
    scaleFactor : number = 2;

    constructor(props: MagnifiedInterface) {
        super(props);
        
        this.areaToZoom = props.areaToZoom;
        console.log("We are zooming " + this.areaToZoom);
    }

    updateMouseLocation(e : React.MouseEvent) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    magnify() {
        // The exclamation point asserts that this element is not null - suppreses typescript errors
        let prop = document.querySelector(this.areaToZoom)!;
        if (prop == null) return;
        let propClone: any = prop.cloneNode(true)!;
        console.log("The cloned area is " + propClone);
        //console.log("It's innerHTML is " + propClone.innerHTML);
        // Scale the new area
        propClone.style.transform = 'scale(2)';
        propClone.style.transformOrigin = '0 0';
        let magnifiedHTMLArea: HTMLElement = document.querySelector('.magnified')!;
        console.log("The magnified HTML area is " + magnifiedHTMLArea);
        //console.log("The magnified HTML area is " + this.simpleStringify(magnifiedHTMLArea));
        if (magnifiedHTMLArea != null) {
            magnifiedHTMLArea.innerHTML = '';
            magnifiedHTMLArea.appendChild(propClone);
            console.log("The magnified HTML area's innerHTML is " + magnifiedHTMLArea.innerHTML);

            // Move to correct position
            let mx = magnifiedHTMLArea.offsetWidth / 2;
            let my = magnifiedHTMLArea.offsetHeight / 2 + window.scrollY;
            magnifiedHTMLArea.scrollTo(this.mouseX * this.scaleFactor-mx, this.mouseY * this.scaleFactor-my);
        }

    }

    updateMagnify(e : React.MouseEvent) {
        this.updateMouseLocation(e);
        this.magnify();
    }

    makeMagnifiedArea() {
        return <div className = "magnified" onMouseMove = {this.updateMagnify}></div>
    }

    simpleStringify (object: any ){
        var simpleObject: any = {};
        for (var prop in object ){
            console.log("Prop: " + prop + "-" + object[prop] + "");
            if (!object.hasOwnProperty(prop)){
                continue;
            }
            if (typeof(object[prop]) == 'object'){
                continue;
            }
            if (typeof(object[prop]) == 'function'){
                continue;
            }
            simpleObject[prop] = object[prop];
        }
        return JSON.stringify(simpleObject); // returns cleaned up JSON
    };

    assignMagnifiedArea() {
        this.magnifiedArea = this.makeMagnifiedArea();
        console.log("Magnified area is " + this.magnifiedArea);
    }

    render() {
        this.assignMagnifiedArea();
        this.magnify();
        return this.magnifiedArea;
    }
}*/