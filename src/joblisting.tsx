import { Form, FormGroup, Label, Input, Card, CardBody, Table } from "reactstrap";
import { JobListingButton } from "./JobListingButton";
import "./JobListing.css";

// Makes A Job Listing Button given title, career, and salary

export function makeJobProps(title: string, career: string, salary: string) {
    return [title, career, salary];
}

export function JobListing() {

    var jobProps: string[][] = []
    for (var i = 0; i < 5; i++) {
        jobProps.push(makeJobProps("Title " + (i+1), "Career Sentiment " + (i+1), "Salary " + (i+1)));
    }

    return (
        <>
            <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CardBody>
                <Form>
                <FormGroup>
                    <Label for="job-listing-input">Enter a job category...</Label>
                    <br />
                    <Input id="job-listing-input" type="text"></Input>
                </FormGroup>
                </Form>
                <p> Test </p>
                <Table>
                    {jobProps.map((jobProp)=>{
                    return ( 
                        <tr>
                            <th>
                                <JobListingButton 
                                    title = {jobProp[0]}
                                    career= {jobProp[1]}
                                    salary = {jobProp[2]}/>
                            </th>
                        </tr>
                    );
                    })};
                </Table>
            </CardBody>
            </Card>
        </>
    );
}