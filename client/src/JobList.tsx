import { useState } from 'react'
import { Table } from 'reactstrap';
import jsonJobs from "./JobCategories.json"
import { JobListingButton } from './JobListingButton';


interface JobItem {
    career: string,
    description: string,
    salary: string
}

export function JobList(props: any) {
    // const [salary, setSalary] = useState("")

    var filteredJobs = jsonJobs.filter((el: JobItem) => {
        // if no input return all job categories
        if (props.input === '') {
            return el;
        }
        // return the item which contains the user input
        else {
            return el.career.toLowerCase().includes(props.input)
        }
    })
    console.log(typeof(filteredJobs));
    console.log(filteredJobs);

    return (
        <Table>
        <tbody>
        {filteredJobs.map((item: any) => {
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
