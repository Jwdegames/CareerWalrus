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
    const [firstLoad, setFirstLoad] = useState(true);
    var jobTestList: any = [];
    
    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
        }
    }, [])

    useEffect(() => {
        jobTestList = [];
        let myFunc = async () => {
            // Fetch the Cost of living
            await Axios.post("/bls/sendBLSRequest", {
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
            
            console.log("IS USE EFFECT HERE!!");

            const respJob = await Axios.post("/oneStop/getJobs", {
                keyword: props.input2,
                location: "United States",
                radius: 25,
                sortColumns: 0,
                sortOrder: 0,
                startRecord: 0,
                pageSize: 10,
                days: 30})
            // setJobListState(Object.values(respJob.data.Jobs));

            for (let job of respJob.data.Jobs) {
                console.log("In for loop");
                console.log(job);

                // Get salary information for job category from OneStop
                const respDesc = await Axios.post("/oneStop/getJobDesc", {
                    searchID: job.JvId
                })
                var newObj = {title: "", description: "", company: "", postDate: "", url: "", location: "", key: ""};
                newObj.title = job.JobTitle;
                newObj.description = respDesc.data.Description;
                newObj.company = job.Company;
                newObj.postDate = job.AccquisitionDate;
                newObj.url = job.URL;
                newObj.location = job.Location;
                newObj.key = job.JvId;
                console.log(newObj);
                jobTestList.push(newObj);
                // .then((response) => {
                //     var newObj = {title: "", description: "", company: "", postDate: "", url: ""};
                //     newObj.title = job.JobTitle;
                //     newObj.description = response.data.Description;
                //     newObj.company = job.Company;
                //     newObj.postDate = job.AccquisitionDate;
                //     newObj.url = job.URL;
                //     console.log(newObj);
                //     jobTestList.push(newObj);
                // })
            }
            console.log(jobTestList);
            setJobListState(jobTestList);
            
            // .then((response) => {
            //     // console.log(typeof(response.data.Jobs));
            //     setJobListState(Object.values(response.data.Jobs));
            //     // console.log("Our job list state is a " + typeof(Object.values(jobListState)));
            //     // console.log(response.data);
            //     console.log(response.data);
            //     console.log("Before for loop");
            //     for (let job of jobListState) {
            //         console.log("In for loop");
    
            //         // Get salary information for job category from OneStop
            //         Axios.post("/oneStop/getJobDesc", {
            //             searchID: job.JvId
            //         })
            //         .then((response) => {
            //             var newObj = {title: "", description: "", company: "", postDate: "", url: ""};
            //             newObj.title = job.JobTitle;
            //             newObj.description = response.data.Description;
            //             newObj.company = job.Company;
            //             newObj.postDate = job.AccquisitionDate;
            //             newObj.url = job.URL;
            //             console.log(newObj);
            //             jobTestList.push(newObj);
            //         })
            //         .catch((err: any) => {
            //             console.log(err);
            //         })
            //     }
            // })
            // .catch((err: any) => {
            //     console.log(err);
            // })
            
            
            // console.log("Before for loop");
            // for (let job of jobListState) {
            //     // console.log("In for loop");

            //     // Get salary information for job category from OneStop
            //     await Axios.post("/oneStop/getJobDesc", {
            //         searchID: job.JvId
            //     })
            //     .then((response) => {
            //         var newObj = {title: "", description: "", company: "", postDate: "", url: ""};
            //         newObj.title = job.JobTitle;
            //         newObj.description = response.data.Description;
            //         newObj.company = job.Company;
            //         newObj.postDate = job.AccquisitionDate;
            //         newObj.url = job.URL;
            //         console.log(newObj);
            //         jobTestList.push(newObj);
            //     })
            //     .catch((err: any) => {
            //         console.log(err);
            //     })
            // }
            // console.log(jobTestList);
            // // setJobListState(jobTestList);
            // // console.log(jobListState);
        }
        myFunc();
    }, [firstLoad]);



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
                    
                    // {title: "", description: "", company: "", postDate: "", url: "", location: "", key: ""};
                    let actualLocation: string =  (btn.location ? btn.location  : "No location provided for job posting");
                    
                    let display: string = btn.description;
                    let key: string = btn.key;
                    
                    return (
                            <CareerAnalysisButton key = {key}
                                title = {btn.title}
                                company = {btn.company}
                                description = {display}
                                cpiData = {costOfLiving}
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