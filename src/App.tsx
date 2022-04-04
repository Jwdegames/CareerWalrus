import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {MyNavbar} from"./navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const FormBox = lazy(() => import("./FormBox"));


function App() {
  
  return <>
    <MyNavbar/> 
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/jobs" element={<div>Jobs</div>} />
            <Route path="/question-and-answer" element={<FormBox />} />
          </Routes>
        </Suspense>
      </Router>
  </>;
}

export default App;
