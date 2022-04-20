import PropTypes, { InferProps } from "prop-types";
import { JobButtonInterface } from "./CABProps"
/**
 * Button to fill the career analysis field
 * 
 * @returns A button that fills in the career analysis field.
 */
export function CareerAnalysisButton({title, company, description, salary, location, updateFunc} : JobButtonInterface) {

    // Shows a description of the job
    function showDesc() {
        updateFunc(description);
    }

    return (
        <>
            <button onClick = {showDesc}>
                <h3>
                    {title}
                </h3>
                <p>
                    {company}
                </p>
                <p>
                    {salary}
                </p>
                <p>
                    {location}
                </p>
            </button>
        </>
    );
}