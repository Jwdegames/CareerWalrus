import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Dropdown,
  NavLink,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

export function MyNavbar() {

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Career Walrus</NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/jobs/">Job Listing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/question-and-answer/">
                Question and Answer
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      {/* <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/jobs" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </Router> */}
    </>
  );
}

// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// const Home = lazy(() => import('./routes/Home'));
// const About = lazy(() => import('./routes/About'));

// const App = () => (
//   <Router>
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         <Route path="/jobs" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Suspense>
//   </Router>
// );
