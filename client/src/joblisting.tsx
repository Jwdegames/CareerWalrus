import { Form, FormGroup, Label, Input, Card, CardBody, Table } from "reactstrap";
import { JobListingButton } from "./JobListingButton";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./JobListing.css";
import jsonJobs from "./JobCategories.json";
import { JobList } from "./JobList";

// Makes A Job Listing Button given title, career, and salary

export function makeJobProps(title: string, career: string, salary: string) {
    return [title, career, salary];
}

export function JobListing() {
    const [jobCategoryNameList, setjobCategoryNameList] = useState([]); // State variable for array of job category names

    const [inputText, setInputText] = useState("");
    let inputHandler = (e: any) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    const [inputDescription, setIntputDescription] = useState("");
    const [outputJobs, setOutputJobs] = useState("<No Input Detected>");
    let descriptionHandler = (e: any) => {
        setIntputDescription(e.target.value);
    }

    useEffect(() => {
        if (inputDescription) {
          let debouncer = setTimeout(() => {
            Axios.post("/gpt/sendCareerMatchPrompt", {
              prompt: inputDescription,
              temperature: 0.1,
              max_tokens: 256,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            }).then((response) => {
              console.log(response.data);
              setOutputJobs(response.data);
            });
            console.log(setOutputJobs);
          }, 1000);
          return () => {
            clearTimeout(debouncer);
          };
        }
      }, [inputDescription]); // we only want to ask GPT3 for response when user enters text so we listen specifically to 'input'

    return (
        <>
            <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CardBody>
                <Form>
                <FormGroup>
                    <Label for="job-description-input">Enter a basic job description, and the system will give a list of job catagory suggestions!</Label>
                    <br />
                    <Input id="job-description-input" type="text" onChange={descriptionHandler}></Input>
                    <br />
                    <p>A list of career pathways that might fit you are <b>{outputJobs}</b>.</p>
                    <br />
                    <Label for="job-listing-input">Enter a job category to perform a filtered search.</Label>
                    <br />
                    <Input id="job-listing-input" type="text" onChange={inputHandler}></Input>
                </FormGroup>
                </Form>
                <JobList input={inputText} input2={outputJobs}></JobList>
            </CardBody>
            </Card>
        </>
    );
}