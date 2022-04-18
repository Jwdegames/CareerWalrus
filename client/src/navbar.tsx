import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Collapse,
  NavLink
} from "reactstrap";

export function MyNavbar() {

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Career Walrus</NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/jobs">Job Listing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/question-and-answer">
                Question and Answer
              </NavLink>
            </NavItem>
            <NavItem>
              <div id="google_translate_element"></div>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}
