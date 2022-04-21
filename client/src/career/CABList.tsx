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
            // console.log("The object is " + Object.values(jobListState));
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
                    
                    let actualLocation: string =  (btn.Location ? btn.Location  : "No location provided for job posting");
                    
                    let display: string = btn.JobTitle + " at " + btn.Company + " in " + actualLocation;
                    let key: number = index;
                    index += 1;
                    
                    return (
                            <CareerAnalysisButton key = {key}
                                title = {btn.JobTitle}
                                company = {btn.Company}
                                description = {display}
                                salary = "TBD"
                                location = { actualLocation}
                                updateFunc = {props.input as Function}
                            />
                    );
                })
            }
            
        </>
    );
}