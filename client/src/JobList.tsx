import { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import jsonJobs from "./JobCategories.json"
import { JobListingButton } from './JobListingButton';
import Axios from 'axios';

interface JobItem {
    career: string,
    description: string,
    salary: string
}

export function JobList(props: any) {
    const [jobCategoryList, setJobCategoryList]: any = useState([]); // State variable for array of job categories
    const [updateComponent, setUpdateComponent] = useState("");
    var jobCategoryTestList:any = [];

    let axiosArray: any[] = []

    useEffect(() => {
        
        let myFunc = async () => {
            if (props.input2 === null) {
                console.log("Empty list of potential jobs for candidate")
            } else {
                console.log("Input was changed");

                var jobsArray = props.input2.split(",");

                for (let jobCategoryName of jobsArray) {
                    // Clean up name
                    jobCategoryName = jobCategoryName.trim();

                    // Get salary information for job category from OneStop
                    const response = await Axios.post("/oneStop/getSalary", {
                        keyword: jobCategoryName,
                        location: 0,
                        enableMetaData: true
                    })

                    var newObj = {career: "", description: "", salary: ""};
                    newObj.career = jobCategoryName;
                    newObj.description = response.data.OccupationDetail.SocInfo[0].SocDescription;
                    newObj.salary = response.data.OccupationDetail.Wages.NationalWagesList[1].RateType == "Annual" ? response.data.OccupationDetail.Wages.NationalWagesList[1].Median : response.data.OccupationDetail.Wages.NationalWagesList[0].Median; // Annual median wage
                    console.log(newObj);
                    jobCategoryTestList.push(newObj);

                        
                    // // axiosArray.push(axiosPromise)
                    // .then(response => {
                    //     // console.log(response.data);
                    //     // console.log(response.data.OccupationDetail);
                    //     // console.log(response.data.OccupationDetail.SocInfo[0].SocDescription);
                    //     // return `{career: jobCategoryName, description: ${response.data.OccupationDetail.SocInfo[0].SocDescription}, salary: ${response.data.OccupationDetail.}}`;
                        
                        
                    // }).catch((err: any) => {
                    //     console.log(`Error ${err} when calling getSalary for jobCategoryName`);
                    // })
                };
                // const responsesAxios = await Promise.all(axiosArray)


                console.log(jobCategoryTestList);
                setJobCategoryList(jobCategoryTestList);
                console.log(jobCategoryList);
            }
            setUpdateComponent(updateComponent);
        }
    myFunc();
    }, [props.input2]);

    var filteredJobs = jsonJobs.filter((el: JobItem) => {
        // if no input return all job categories
        if (props.input === '') {
            return el;
        }
        // return the item which contains the user input
        else {
            return el.career.toLowerCase().includes(props.input);
        }
    })
    // console.log(typeof(filteredJobs));
    // console.log(filteredJobs);

    return (
        <Table>
        <tbody>
        {jobCategoryList.map((item: any) => {
            console.log("In return function for JobList")
            // console.log(item);
            return ( 
                <tr key={item.career}>
                    <th>
                        <JobListingButton 
                            title = {item.career}
                            career= {item.description}
                            salary = {item.salary}/>
                    </th>
                </tr>
            );
        })}
        </tbody>
        </Table> 
    );
}
