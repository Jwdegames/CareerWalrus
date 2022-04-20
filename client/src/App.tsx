import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {MyNavbar} from"./navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import {JobListing} from "./joblisting";
import { FAQ } from "./faq/faq"
import { CareerAnalysis } from "./career/CareerAnalysis";
const FormBox = lazy(() => import("./FormBox"));

function App() {
  return <>
    <MyNavbar/> 
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div><FAQ /></div>} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/careers" element={<CareerAnalysis/>}/>
            <Route path="/question-and-answer" element={<FormBox />} />
          </Routes>
        </Suspense>
      </Router>
  </>;
}

export default App;
