import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardText, CardTitle, Spinner, CardSubtitle } from "reactstrap";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { QuestionPresets } from "./question-presets/presets";
import "./FormBox.css";

export default function FormBox() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [GPT3Cache, setGPT3Cache] = useState("");
  const [funMode, setFunMode] = useState(false);
  const [gptCallAddr, setGptCallAddr] = useState("/gpt/sendGPTPrompt");
  const [redditButtonColor, setRedditButtonColor] = useState("link");
  const [redditButtonText, setRedditButtonText] = useState("Click Me!");

  const [spinnerHidden, hideSpinner] = useState(true); // hide spinner initial b/c not load anything

  // Calls new GPT3 API request only when gpt3Input changes
  // idk? I called yarn dev. I can redo it. that makes sense

  const callGPT3 = () => {
    let inputprompt =
      "Use the following summary of an individual's interests to generate a list of comma-seperated engineering jobs that fits their professional and academic profile. Try to return engineering related careers. If the user enters a career related question, answer it.\n \n User Input: ";
    if (GPT3Cache) {
      console.log(gptCallAddr); // this thing is printing empty string
      hideSpinner(false);
      Axios.post(gptCallAddr, {
        prompt: inputprompt + GPT3Cache + "/n",
        temperature: 0.1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then((response) => {
        setOutput(response.data);
        hideSpinner(true);
      });
    }
  };

  useEffect(() => {
    callGPT3();
  }, [GPT3Cache]);

  // this tells any listeners to 'input' to update with 'input's new value passed in
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  // used for presets to set textarea with clicked question and call gpt3
  const presetCaller = (value: string) => {
    setInput(value);
    setGPT3Cache(value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setGPT3Cache(input);
    }
  };
  // tells listeners to change the webpage's mode to funmode
  const handleModeChange = (e: any) => {
    if (!funMode) {
      setRedditButtonColor("danger");
      setRedditButtonText("Reddit Mode Active! (Beta)");
      setGptCallAddr("/gpt/sendRedditPrompt");
      console.log("Reddit Mode");
      setFunMode(true);
    } else {
      setRedditButtonColor("primary");
      setRedditButtonText("Professional Mode Active!");
      setGptCallAddr("/gpt/sendGPTPrompt");
      console.log("Professional Mode");
      setFunMode(false);
    }
  };

  return (
    <div className="QNAContainer">
      <Card className="InputFormArea" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="gpt-input">
                Give a basic description of your interests to get career options or ask a question. Try to be specific... <br />
                <b>Examples:</b> <br />
                "I am a high school student enrolled in multiple advanced placement courses who attends a robotics orgnization after school." <br />
                "What steps do I need to take to become a mechanical engineer?" <br />
                You can also choose a pre-selected prompt from the options below. The top option is based on the previously generated response of GPT if you want more information. <br />
              </Label>
              <div className="InputGroup">
                <Input className="InputArea" id="gpt-input" type="textarea" value={input} onChange={handleChange} onKeyPress={handleKeyPress}></Input>
                <Button className="RedditBtn" onClick={handleModeChange} color={redditButtonColor}>
                  {redditButtonText}
                </Button>
              </div>
              <Button
                className="EnterButton"
                color="primary"
                size="sm"
                onClick={(e: any) => {
                  e.preventDefault();
                  setGPT3Cache(input);
                }}
              >
                Enter
              </Button>
            </FormGroup>
            <FormGroup></FormGroup>
          </Form>
        </CardBody>
      </Card>

      <div className="OutputArea">
        <Card
          className="OutputBox"
          body
          inverse
          style={{
            backgroundColor: "#333",
            borderColor: "#333",
          }}
        >
          <CardTitle>
            <b>Response:</b>
          </CardTitle>
          <CardSubtitle>
            {spinnerHidden ? null : (
              <Spinner color="primary" size="">
                Loading...
              </Spinner>
            )}
          </CardSubtitle>
          <CardText>{output}</CardText>
        </Card>

        <QuestionPresets setInput={presetCaller} output={output} />
      </div>
    </div>
  );
}
