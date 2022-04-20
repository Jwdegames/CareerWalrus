import PropTypes, { InferProps } from "prop-types";
import { JobButtonInterface } from "./CABProps"
/**
 * Button to fill the career analysis field
 * 
 * @returns A button that fills in the career analysis field.
 */
export function CareerAnalysisButton({title, company, salary, location} : JobButtonInterface) {
    return (
        <>
                <button >
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