import React, { PropsWithChildren, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Collapse,
  NavLink,
  Button
} from "reactstrap";
import "./navbar.css";

interface MyNavbarInterface {
  magnified: boolean
  setMagnified: Function
  fake: boolean
  Translate: React.RefObject<HTMLDivElement>;
}


function Translation() {
  var translation = document.querySelector('#google_translate_element');
  if (translation == null) return;
  console.log("Translation element is " + translation);
  var transClone = translation?.cloneNode(true)!;
  if (transClone == null) return;
  console.log("Made clone");

  var nextTranslation = document.querySelector('#translation_true');
  if (nextTranslation == null) return;
  console.log("Got fake element");
  nextTranslation!.innerHTML = '';
  nextTranslation!.appendChild(transClone);
  console.log("Translation element transfer complete");

    // Get the fake translation element
    let translates = document.getElementsByClassName("goog-te-combo");
    let fakeTranslate: any = translates[1];
    if (fakeTranslate == null) {
      console.log("Failed to initialize translate - fake translation element is null");
      return;
    }
    fakeTranslate.addEventListener('change', (event: any) => {
      console.log("Fake Translate changed");
      updateTranslate();
    });

  
}

function updateTranslate() {
  console.log("Updating translate");
  let mainTranslate: any = document.querySelector(".goog-te-combo");
  if (mainTranslate == null) {
    console.log("Failed to translate - main translation element is null");
    return;
  }
  // Get the fake translation element
  let translates = document.getElementsByClassName("goog-te-combo");
  let fakeTranslate: any = translates[1];
  if (fakeTranslate == null) {
    console.log("Failed to translate - fake translation element is null");
    return;
  }
  mainTranslate.value = fakeTranslate.value;
  mainTranslate!.dispatchEvent(new Event('change'));

}

export function MyNavbarBasic({magnified, setMagnified, fake, Translate} : MyNavbarInterface) {
  useEffect(() => {
    setTimeout(function() {
      console.log("Translating");
      Translation();
    }, 3000)
  }, []);
  //console.log("Reloading with magnified: " + magnified);
  function toggleMagnified(e : React.MouseEvent) {
    //console.log("Modifiying: " + setMagnified);
    magnified = !magnified;
    if (fake) {
      magnified = false;
    }
    setMagnified(magnified);
    //console.log(magnified);
  }

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Career Walrus</NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/jobs">
                Job Listing
                </NavLink>
              </NavItem>
            <NavItem>
              <NavLink href="/question-and-answer">
                Question and Answer
              </NavLink>
            </NavItem>
            <NavItem>
              <div id="google_translate_element"></div>
              {
                fake ? (<div id ={"translation_"+fake}></div>) : (<></>)
              }
            </NavItem>
            <NavItem>
              <Button onClick = {toggleMagnified}>Toggle Magnifier</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export class MyNavbar extends React.Component<MyNavbarInterface> {
  magnified: boolean;
  setMagnified: Function;
  fake: boolean;
  Translate: React.RefObject<HTMLDivElement>
  Navbar? : any;

  constructor(props: MyNavbarInterface) {
    super(props);
    this.magnified = props.magnified;
    this.setMagnified = props.setMagnified;
    this.fake = props.fake;
    this.Translate = props.Translate;
  }

  makeNavbar() {
    return <MyNavbarBasic magnified = {this.magnified} setMagnified = {this.setMagnified} fake = {this.fake} Translate = {this.Translate}/>
  }

  assignNavbar() {
    this.Navbar = this.makeNavbar();
  }

  render() {
    this.assignNavbar();
    Translation();
    return this.Navbar;
  }
}
