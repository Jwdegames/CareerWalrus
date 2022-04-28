import { count } from "console";
import PropTypes, { InferProps } from "prop-types";
import { JobButtonInterface } from "./CABProps"
import {getArray, getTimeArray, getAvg, getAvgArray, getSlope} from "./BLSStats"
import Axios from 'axios';

/**
 * Button to fill the career analysis field
 * 
 * @returns A button that fills in the career analysis field.
 */
export function CareerAnalysisButton({title, company, description, cpiData, salary, location, updateFunc} : JobButtonInterface) {

    /**
     * Generates the description
     */
    function getDesc() {
        return (
            <div>
                <p>
                    {description}
                </p>
                <p>
                    The latest Consumer Price Index is {cpiData[0].value} recorded in {cpiData[0].periodName}, {cpiData[0].year}. The average CPI is {getAvg(cpiData, 'value')}.
                    The slope of the CPI as a function of time (in months) is {getSlope(getTimeArray(cpiData, 'year', 'periodName'), getArray(cpiData, 'value').reverse())}.
                </p>
            </div>

        );
    }

    // Shows a description of the job
    function showDesc() {
        Axios.post("oneStop/getJobDesc", {
            
        })
        updateFunc(getDesc());
    }
    //console.log(cpiData);
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