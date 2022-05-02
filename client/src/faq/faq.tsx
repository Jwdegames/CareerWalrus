import { Magnify } from "../magnifying/Magnifying";

/**
 * Makes a FAQ for the landing page to use.
 */
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import "./faq.css";

export function FAQ() {
  return (
    <div className="FAQContainer">
      <Card className="FAQElement" body color="primary" inverse>
        <CardBody>
          <CardTitle tag="h5">What Is Career Walrus?</CardTitle>
          <CardText>Career Walrus is a website that helps job seekers and students by consolidating career information from various APIs.</CardText>
        </CardBody>
      </Card>

      <Card className="FAQElement" body color="primary" inverse>
        <CardBody>
          <CardTitle tag="h5">How Do I Use Career Walrus?</CardTitle>
          <CardText>You can visit the different tabs on the Navbar at the top of the page. There is a Job Listing Section that offers information on available jobs info. If you have questions about different careers, you can go to the Question and Answer page. </CardText>
        </CardBody>
      </Card>

      <Card className="FAQElement" body color="primary" inverse>
        <CardBody>
          <CardTitle tag="h5">What Can I Do On The Job Listing Page? </CardTitle>
          <CardText>
            On the job listing page, you can search for different types of jobs. Each job will have a career sentiment showcasing how people feel about this type of job. Then, there is the average salary for the job. You can also click on the job to get a listing of various positions for this job.{" "}
          </CardText>
        </CardBody>
      </Card>

      <Card className="FAQElement" body color="primary" inverse>
        <CardBody>
          <CardTitle tag="h5">What Can I Do On The Question And Answer Page? </CardTitle>
          <CardText>You can ask various questions or make requests on this page. Then, the API can respond and give career information. It essentially is a chat bot that you can talk to. </CardText>
        </CardBody>
      </Card>
    </div>
  );
}
