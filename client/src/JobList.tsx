import { useState } from 'react'
import { NavigateFunction } from 'react-router-dom';
import { Table } from 'reactstrap';
import jsonJobs from "./JobCategories.json"
import { JobListingButton } from './JobListingButton';


interface JobItem{
    career: string,
    description: string,
    salary: string
}

interface JobListInterface {
    input: string
    navigator: NavigateFunction;
}


export function JobList({input, navigator} : JobListInterface) {
    const filteredJobs = jsonJobs.filter((el: JobItem) => {
        // if no input return all job categories
        if (input === '') {
            return el;
        }
        // return the item which contains the user input
        else {
            return el.career.toLowerCase().includes(input)
        }
    })
    return (
        <Table>
        <tbody>
        {filteredJobs.map((item) => {
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
