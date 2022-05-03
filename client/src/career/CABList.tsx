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

        let myFunc = async () => {
            for (let job of jobListState) {
                console.log(job);
                // // Get salary information for job category from OneStop
                // const response = await Axios.post("/oneStop/getJobDesc", {
                //     searchID: job.
                // })

                // var newObj = {career: "", description: "", salary: ""};
                // newObj.career = jobCategoryName;
                // newObj.description = response.data.OccupationDetail.SocInfo[0].SocDescription;
                // newObj.salary = response.data.OccupationDetail.Wages.NationalWagesList[1].RateType == "Annual" ? response.data.OccupationDetail.Wages.NationalWagesList[1].Median : response.data.OccupationDetail.Wages.NationalWagesList[0].Median; // Annual median wage
                // console.log(newObj);
                // jobCategoryTestList.push(newObj);
            }
        }
        
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