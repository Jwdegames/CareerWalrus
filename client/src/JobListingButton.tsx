import "./JobListingButton.css";
import PropTypes, { InferProps } from "prop-types";
import { MouseEventHandler } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";


export function JobListingButton({ title, career, salary, navigator }: JobListingButtonInterface) {
  /**
   * Loads the career analysis elements when this job is pressed.
   *
   * @param e Event that called the function
   */
  function loadCareerAnalysis(e: React.MouseEvent) {
    // Go to career analysis page
    navigator("../careers", { state: { listingState: title }, replace: true });
  }
  return (
    <>
      <Button color="primary" onClick={loadCareerAnalysis}>
        <h1>{title}</h1>
        <p>{career}</p>
        <p>Median Annual Salary: ${salary}</p>
      </Button>
    </>
  );
}

interface JobListingButtonInterface {
  title: string;
  career: string;
  salary: string;
  navigator: NavigateFunction;
}
