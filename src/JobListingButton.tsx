import "./JobListingButton.css";
import PropTypes, { InferProps } from "prop-types";

export function JobListingButton({title, career, salary} : 
    InferProps<typeof JobListingButton.propTypes>) {

    return (
        <>
            <button>
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