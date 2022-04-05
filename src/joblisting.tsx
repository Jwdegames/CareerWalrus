import { Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";

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
            </CardBody>
            </Card>
        </>
    );
}