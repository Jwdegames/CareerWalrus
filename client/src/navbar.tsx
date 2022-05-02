import React from "react";
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
}

export function MyNavbar({magnified, setMagnified, fake} : MyNavbarInterface) {
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
