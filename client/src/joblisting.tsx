import { Form, FormGroup, Label, Input, Card, CardBody, Table } from "reactstrap";
import { JobListingButton } from "./JobListingButton";
import { useState } from "react";
import "./JobListing.css";
import jsonJobs from "./JobCategories.json";
import { JobList } from "./JobList";
const axios = require('axios').default;

// Makes A Job Listing Button given title, career, and salary

export function makeJobProps(title: string, career: string, salary: string) {
    return [title, career, salary];
}

export function JobListing() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e: any) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    axios.post("/oneStop/getJobs", {
        keyword: "Software Developers",
        location: "United States",
        radius: "25",
        sortColumns: "0",
        sortOrder: "0",
        startRecord: "0",
        pageSize: "100",
        days: "30"
    })
    .then(() => {
        console.log("Finished post to index");
    })
    .catch((err: any) => {
        console.log(err);
    })

    return (
        <>
            <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CardBody>
                <Form>
                <FormGroup>
                    <Label for="job-listing-input">Enter a job category...</Label>
                    <br />
                    <Input id="job-listing-input" type="text" onChange={inputHandler}></Input>
                </FormGroup>
                </Form>
                <p> Test </p>
                <JobList input={inputText}></JobList>
            </CardBody>
            </Card>
        </>
    );
}