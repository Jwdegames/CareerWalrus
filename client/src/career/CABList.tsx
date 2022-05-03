import { CareerAnalysisButton } from "./CareerAnalysisButton"
import {JobItem} from "./CABProps";
import Axios from 'axios';
import { json } from "stream/consumers";
import { useState, useEffect } from "react";
/**
 * Holds a list of Career Analysis Buttons
 * 
 * @returns List of Career Analysis Buttons
 * 
 */
export function CABList(props: any) {
    var buttonsList: JobItem[] = [];
    const [jobListState, setJobListState]: [any, any] = useState([]);
    const [costOfLiving, setCostOfLiving]: [any, any] = useState([]);
    const [wikipediaState, setWikipediaState] = useState("");

    
    useEffect(() => {
        console.log("IS USE EFFECT HERE!!");
        Axios.post("/oneStop/getJobs", {
            keyword: props.input2,
            location: "United States",
            radius: 25,
            sortColumns: 0,
            sortOrder: 0,
            startRecord: 0,
            pageSize: 10,
            days: 30})
        .then((response) => {
            // console.log(typeof(response.data.Jobs));
            setJobListState(Object.values(response.data.Jobs));
            // console.log("Our job list state is a " + typeof(Object.values(jobListState)));
            // console.log(response.data);
        })
        .catch((err: any) => {
            console.log(err);
        })
        
        // Fetch the Cost of living
        Axios.post("/bls/sendBLSRequest", {
            seriesid: 'CUUR' + props.input3 +'SA0',
            startyear: '2008',
            endyear: '2022',})
        .then((response) => {
            console.log(response);
            setCostOfLiving(Object.values(response.data.Results.series[0].data));
        })
        .catch((err: any) => {
            console.log(err);
        })

        
    }, []);

    // Comment this out to disable the testing
    let index = 0;
    return (
        <>
            {
                jobListState.map((btn: any) => {
                    let job = JSON.stringify(btn);
                    // console.log("The current job is " + JSON.stringify(btn));
                    // console.log("The company of the current job is " + btn.Company);
                    // console.log("Our job list state is a " + typeof(jobListState));
                    

                    // Fetch the Cost of living
                    //console.log("Requesting wikipedia");
                    /*
                    Axios.post("/wikipedia/sendWikipediaRequest", {
                          search: btn.company})
                      .then(response => {
                        console.log(response);
                        if (response.data.query.pages.hasOwnProperty(-1)) 
                        {
                          
                          console.log("Target company missing from wikipedia");
                          const callGPT3 = () => {
                            
                              Axios.post("/gpt/sendGPTPrompt", {
                                prompt: "Give me a summary of the company " + btn.company, 
                                temperature: 0.1,
                                max_tokens: 256,
                                top_p: 1,
                                frequency_penalty: 0,
                                presence_penalty: 0,
                              }).then((response) => {
                                console.log("GPT3 response is " + response.data);
                                setWikipediaState(response.data);
                              });
                          };
                          
                          callGPT3();
              
              
              
                          //setWikipediaState("Invalid Company");
                          //return "Invalid company";
                        }
                        let pages = response.data.query.pages;
                        let wikiStateKey = Object.keys(pages);
                        let wikiState = pages[wikiStateKey[0]];
                        let wikiStateString = JSON.stringify(wikiState.extract);
                        console.log(wikiStateString);
                        setWikipediaState(wikiStateString);
                      })
                      .catch((err: any) => {
                          console.log(err);
                      })*/
                    

                    let actualLocation: string =  (btn.Location ? btn.Location  : "No location provided for job posting");
                    
                    let display: string = btn.JobTitle + " at " + btn.Company + " in " + actualLocation;
                    let key: number = index;
                    index += 1;
                    
                    return (
                            <CareerAnalysisButton key = {key}
                                title = {btn.JobTitle}
                                company = {btn.Company}
                                description = {display}
                                wikipedia = {wikipediaState}
                                cpiData = {costOfLiving}
                                salary = "TBD"
                                location = {actualLocation}
                                blsLocation = {props.input4}
                                updateFunc = {props.input as Function}
                            />
                    );
                })
            }
            
        </>
    );
}