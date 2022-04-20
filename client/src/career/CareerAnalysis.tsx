import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Row, Col} from 'reactstrap'
import { CABList } from "./CABList";
import "./CareerAnalysis.css"
import "./CABList"
/**
 * Makes the career analysis page. Has two states: company listings and job listings
 */
export function CareerAnalysis() {
    // Handles listing state
    const [listingState, setListingState] = useState("");
    // List selection
    const [listingSelection, setListingSelection] = useState("");
    // Initialized
    const [initialized, setInit] = useState("");
    const state = useLocation();
    // Sets the input of listing state from 
    let setLSInput = () => {
        const stateProps = state.state as any;
        console.log(stateProps);
        var ls_input = stateProps["listingState"] as any;
        console.log("Input is " + ls_input);
        setListingState(ls_input);
        setInit("True");
    }
    console.log("Listing selection is " + listingSelection);
    // Below code should only be run once to prevent issues.
    if (initialized == "") {
        setLSInput();
    }
    //setListingState(state[listingState]);
    return (
    <>
        <p>
            We are currently showing {listingState} listings.
        </p>
        <Container>
            <Row>
                <Col className = "col" sm={4}>
                    Test
                    <CABList input = {setListingSelection}></CABList>
                </Col>
                
                <Col className = "col" sm={8}>{listingSelection}</Col>
            </Row>
        </Container>
    </>);


}