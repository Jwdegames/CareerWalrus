import { NavigateFunction } from 'react-router-dom';
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

interface JobListInterface {
    input: any;
    input2: any;
    navigator: NavigateFunction;
}

export function JobList({input, input2, navigator} : JobListInterface) {
    const [jobCategoryList, setJobCategoryList]: any = useState([]); // State variable for array of job categories
    const [updateComponent, setUpdateComponent] = useState("");
    var jobCategoryTestList: any = [];

    let axiosArray: any[] = []

    useEffect(() => {
        
        let myFunc = async () => {
            if (!input2) {
                console.log("Empty list of potential jobs for candidate")
            } else {
                console.log("Input was changed");

                var jobsArray = input2.split(",");

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
                }

                console.log(jobCategoryTestList);
                setJobCategoryList(jobCategoryTestList);
                console.log(jobCategoryList);
            }
            setUpdateComponent(updateComponent);
        }
    myFunc();
    }, [input2]);

    var filteredJobs = jsonJobs.filter((el: JobItem) => {
        // if no input return all job categories
        if (input === '') {
            return el;
        }
        // return the item which contains the user input
        else {
            return el.career.toLowerCase().includes(input)
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
                            salary = {item.salary}
                            navigator = {navigator}/>
                    </th>
                </tr>
            );
        })}
        </tbody>
        </Table> 
    );
}
