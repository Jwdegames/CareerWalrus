import "./JobListingButton.css";
import PropTypes, { InferProps } from "prop-types";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export function JobListingButton({title, career, salary} : 
    InferProps<typeof JobListingButton.propTypes>) {

        var navigator = useNavigate();
        /**
         * Loads the career analysis elements when this job is pressed.
         * 
         * @param e Event that called the function
         */
        function loadCareerAnalysis(e: React.MouseEvent) {
            // Go to career analysis page
            navigator("../careers", {state: { listingState: title }});
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

JobListingButton.propTypes = {
    title: PropTypes.string.isRequired,
    career: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired
};