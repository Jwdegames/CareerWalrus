import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {MyNavbar} from"./navbar";
import { BrowserRouter as Router, Routes, Route, NavigateFunction } from "react-router-dom";
import { lazy, Suspense } from "react";
import {JobListing} from "./joblisting";
import { FAQ } from "./faq/faq"
import { CareerAnalysis } from "./career/CareerAnalysis";
import { Magnify } from "./magnifying/Magnifying";
const FormBox = lazy(() => import("./FormBox"));

interface BasicAppInterface {
  magnified: boolean;
  setMagnified: Function
  fake: boolean
  Translate: React.RefObject<HTMLDivElement>
  navigate: NavigateFunction;
}

function App({magnified, setMagnified, fake, Translate, navigate} : BasicAppInterface) {
  return <>
    <MyNavbar magnified = {magnified} setMagnified = {setMagnified} fake = {fake} Translate = {Translate}/> 
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div><FAQ /></div>} />
            <Route path="/jobs" element={<JobListing navigate = {navigate}/>} />
            <Route path="/careers" element={<CareerAnalysis/>}/>
            <Route path="/question-and-answer" element={<FormBox />} />
          </Routes>
        </Suspense>
    </>;
}

function testApp() {
  function dummy(magnified: boolean) {}
  //return <Magnify AreaToZoom={BasicApp({magnified: false, setMagnified: dummy}) }/>
  //return <BasicApp></BasicApp>;
}

export default App;
