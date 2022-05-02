import {Magnify} from "../magnifying/Magnifying";

/**
 * Makes a FAQ for the landing page to use. 
 */
export function FAQ() {
    return (
        <>
            <h2>
                What Is Career Walrus?
            </h2>
                <p>
                    Career Walrus is a website that helps job seekers and students by consolidating career information from various APIs.
                </p>
            <h2>
                How Do I Use Career Walrus?
            </h2>
                <p>
                    You can visit the different tabs on the Navbar at the top of the page. There is a Job Listing Section that offers information on available jobs info.
                    If you have questions about different careers, you can go to the Question and Answer page.
                </p>
            <h2>
                What Can I Do On The Job Listing Page?
            </h2>
                <p>
                    On the job listing page, you can search for different types of jobs. Each job will have a career sentiment showcasing how people feel about this type of job.
                    Then, there is the average salary for the job. You can also click on the job to get a listing of various positions for this job. 
                </p>
            <h2>
                What Can I Do On The Question And Answer Page?
            </h2>
                <p>
                    You can ask various questions or make requests on this page. Then, the API can respond and give career information.
                    It essentially is a chat bot that you can talk to.
                </p>
        </>);
}