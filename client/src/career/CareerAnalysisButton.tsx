import { count } from "console";
import PropTypes, { InferProps } from "prop-types";
import { JobButtonInterface } from "./CABProps";
import { getArray, getTimeArray, getAvg, getAvgArray, getSlope } from "./BLSStats";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import "./Career.css";
import Axios from 'axios';
/**
 * Button to fill the career analysis field
 *
 * @returns A button that fills in the career analysis field.
 */


export function CareerAnalysisButton({title, company, description, wikipedia, cpiData, salary, location, blsLocation, updateFunc} : JobButtonInterface) {
    const [wikipediaState, setWikipediaState] = useState("");

      // Fetch the Cost of living
      function getWikipedia() {
        console.log("Requesting wikipedia");

        return Axios.post("/wikipedia/sendWikipediaRequest", {
              search: company})
          .then(response => {
            console.log(response);
            if (response.data.query.pages.hasOwnProperty(-1)) 
            {
              
              console.log("Target company missing from wikipedia");
              const callGPT3 = async () => {
                
                  return await Axios.post("/gpt/sendGPTPrompt", {
                    prompt: "Give me a summary of the company " + company, 
                    temperature: 0.1,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                  }).then((response) => {
                    console.log("GPT3 response is " + response.data);
                    setWikipediaState(response.data);
                    setTimeout(() => {updateFunc(getDesc(response.data))}, 2000);
                  });
              };
              
              return callGPT3();



              //setWikipediaState("Invalid Company");
              //return "Invalid company";
            }
            let pages = response.data.query.pages;
            let wikiStateKey = Object.keys(pages);
            let wikiState = pages[wikiStateKey[0]];
            let wikiStateString = JSON.stringify(wikiState.extract);
            console.log(wikiStateString);
            setWikipediaState(wikiStateString);
            setTimeout(() => {updateFunc(getDesc(wikiStateString))}, 2000);
            return Promise.resolve();
          })
          .catch((err: any) => {
              console.log(err);
          })

      }
      
        //return response;
  
      //return "Post gone";

    /**
     * Generates the description
     */
    function getDesc(wikipediaData: string) {
      console.log("Updating description: WikipediaState is " + wikipediaState);
      console.log("Wikipedia data is " + wikipediaData);
      if (wikipediaData == "" || wikipediaData == null) {
        wikipediaData = wikipediaState;
      }
        return (
            <div>
                <p>
                    {description}
                </p>
                <p>
                    The latest Consumer Price Index in {blsLocation} is {cpiData[0].value} recorded in {cpiData[0].periodName}, {cpiData[0].year}. 
                    The average CPI is {getAvg(cpiData, 'value').toFixed(3)}.
                    The slope of the CPI as a function of time (in months) is {getSlope(getTimeArray(cpiData, 'year', 'periodName'), getArray(cpiData, 'value').reverse()).toFixed(3)}.
                    This means that the CPI changes by about {getSlope(getTimeArray(cpiData, 'year', 'periodName'), getArray(cpiData, 'value').reverse()).toFixed(3)} every month on average.
                    <br>
                    </br>
                    <br></br>
                    Wikipedia says: {wikipediaData}
                </p>
            </div>

        );
    }

    // Shows a description of the job
    //console.log(cpiData);
  

  // Shows a description of the job
  function showDesc() {
    if (wikipediaState == "") {
      getWikipedia().then(() => updateFunc(getDesc("")));
      //getWikipedia().then(() => {
        //console.log("Test");
        //updateFunc(getDesc())
      //});
    }
    updateFunc(getDesc(""));
    // setTimeout(updateFunc(getDesc()), 2000);
  }
  //console.log(cpiData);
  return (
    <>
      <Button color="info" outline className="JobButton" onClick={showDesc}>
        <h3>{title}</h3>
        <p>{company}</p>
        <p>{salary}</p>
        <p>{location}</p>
      </Button>
    </>
  );
}
