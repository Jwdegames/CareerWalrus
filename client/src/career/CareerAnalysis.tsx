import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Row, Col} from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { CABList } from "./CABList";
import { getAreaCodes } from "./BLSCodes";
import "./CareerAnalysis.css"
import "./CABList"
/**
 * Makes the career analysis page. Has two states: company listings and job listings
 */
export function CareerAnalysis() {
    // Handles listing state
    const [listingState, setListingState] = useState("");
    // List selection
    const [listingSelection, setListingSelection]: [any, any] = useState([]);
    // Initialized
    const [initialized, setInit] = useState("");
    // Dropdown open
    const [opened, setOpened] = useState(false);
    // Selected area
    const [area, setArea] = useState("");
    const state = useLocation();
    // Area codes
    let areaCodes: any = getAreaCodes();
    // Sets the input of listing state from 
    let setLSInput = () => {
        const stateProps = state.state as any;
        console.log(stateProps);
        var ls_input = stateProps["listingState"] as any;
        console.log("Input is " + ls_input);
        setListingState(ls_input);
        setInit("True");
    }
    //console.log("Listing selection is " + listingSelection);
    // Below code should only be run once to prevent issues.
    if (initialized == "") {
        setLSInput();
    }
    //setListingState(state[listingState]);

    var navigator = useNavigate();
    /**
     * Loads the job listing elements (i.e. returns to the previous page).
     * 
     * @param e Event that called the function
     */
    function loadJobListing(e: React.MouseEvent) {
        // Go to job listing page
        navigator("../job", {state: { listingState: listingSelection }});
    }

    /**
     * Handles if the dropdown menu is open
     */
    function toggleOpen() {
        setOpened(!opened);
        return opened;
    }

    return (
    <>
        <p>
            We are currently showing job listings for {listingState}. &nbsp; &nbsp; &nbsp;
            <Button className = "ret-btn" onClick = {loadJobListing}>Return To Job Listing</Button> &nbsp; &nbsp; &nbsp;
            Select An Area To See Cost Of Living: &nbsp; &nbsp; &nbsp;
            <Dropdown className = "area-drop" isOpen={opened} toggle={toggleOpen}>
                <DropdownToggle className = "area-drop-btn">
                    {area}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        Object.keys(areaCodes).map((key: any, value: any) => {
                            console.log("Adding " + key + " : " + areaCodes[key]);
                            //return null;
                            return (
                            <DropdownItem onClick = {() => setArea(key+" "+areaCodes[key])}>{key +" : "+ areaCodes[key]}</DropdownItem>
                            
                            

                            );
                        })
                    }

                </DropdownMenu>
            </Dropdown>
        </p>

        <Container>
            <Row>
                <Col className = "col" sm={4}>
                    Test
                    <CABList input = {setListingSelection} input2 = {listingState}></CABList>

                </Col>
                
                <Col className = "col" sm={8}>{listingSelection}</Col>
            </Row>
        </Container>
    </>);


}