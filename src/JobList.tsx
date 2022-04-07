import { useState } from 'react'
import { Table } from 'reactstrap';
import jsonJobs from "./JobCategories.json"
import { JobListingButton } from './JobListingButton';

export function JobList(props: any) {
    const filteredJobs = jsonJobs.filter((el: any) => {
        // if no input return all job categories
        if (props.input === '') {
            return el;
        }
        // return the item which contains the user input
        else {
            return el.career.toLowerCase().includes(props.input)
        }
    })
    return (
        <Table>
        {filteredJobs.map((item) => {
            return ( 
                <tr>
                    <th>
                        <JobListingButton 
                            title = {item.career}
                            career= {item.description}
                            salary = {item.salary}/>
                    </th>
                </tr>
            );
        })}
        </Table> 
    );
}
