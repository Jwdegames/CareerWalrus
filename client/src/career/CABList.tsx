import { CareerAnalysisButton } from "./CareerAnalysisButton"
import {JobItem} from "./CABProps";
/**
 * Holds a list of Career Analysis Buttons
 * 
 * @returns List of Career Analysis Buttons
 * 
 */
export function CABList() {

    var buttonsList: JobItem[] = [];
    /**
     * Tests the CAB List functionality by setting the buttons list
     */
    function test(){
        for (var i = 0; i < 10; i += 1) {
        var example = new JobItem("Job " + i, "Company " + i, "Description " + i, "Salary " + i, "Location " + i);
        buttonsList.push(example);
        }
    }

    // Comment this out to disable the testing
    test()

    

    return (
        <>
            {
                buttonsList.map((btn) => {
                    return (
                        <>
                            <CareerAnalysisButton
                                title = {btn.title}
                                company = {btn.company}
                                salary = {btn.salary}
                                location = {btn.location}
                            
                            />
                        </>

                    );
                })
            }
            
        </>
    );
}