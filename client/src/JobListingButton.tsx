import "./JobListingButton.css";
import PropTypes, { InferProps } from "prop-types";
import { MouseEventHandler } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export function JobListingButton({title, career, salary, navigator} : 
    JobListingButtonInterface) {
        /**
         * Loads the career analysis elements when this job is pressed.
         * 
         * @param e Event that called the function
         */
        function loadCareerAnalysis(e: React.MouseEvent) {
            // Go to career analysis page
            navigator("../careers", {state: { listingState: title }, replace: true});
        }
    return (
        <>
            <button onClick={loadCareerAnalysis}>
                <h1>
                    {title}
                </h1>
                <p>
                    {career}
                </p>
                <p>
                    {salary}
                </p>
            </button>
        </>
    );
}

interface JobListingButtonInterface {
    title: string;
    career: string;
    salary: string;
    navigator: NavigateFunction;
}