import { useState } from "react";
import { useLocation } from "react-router-dom";
/**
 * Makes the career analysis page. Has two states: company listings and job listings
 */
export function CareerAnalysis() {
    // Handles listing state
    const [listingState, setListingState] = useState("");
    // List selection
    const [listingSelection, setListingSelection] = useState("");

    const {state} = useLocation();
    setListingState(state[listingState]);
    return (
    <>
        <p>
            We are currently showing {listingState}
        </p>
    </>);


}