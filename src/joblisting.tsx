import { Form, FormGroup, Label, Input, Card, CardBody, Table } from "reactstrap";
import { JobListingButton } from "./JobListingButton";
import { useState } from "react";
import "./JobListing.css";
import jsonJobs from "./JobCategories.json";

// Makes A Job Listing Button given title, career, and salary

export function makeJobProps(title: string, career: string, salary: string) {
    return [title, career, salary];
}

export function JobListing() {

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
                    {jsonJobs.map((item) => {
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
                    })};
                </Table>
            </CardBody>
            </Card>
        </>
    );
}