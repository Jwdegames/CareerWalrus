import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardText } from "reactstrap";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { QuestionPresets } from "./question-presets/presets";

export default function FormBox() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [funMode, setFunMode] = useState(false);
  const [gptCallAddr, setGptCallAddr] = useState("");
  const [redditButtonColor, setRedditButtonColor] = useState("link");
  const [redditButtonText, setRedditButtonText] = useState("Click Me!")

  useEffect(() => {
    let inputprompt =
      "Use the following summary of an individual's interests to generate a list of comma-seperated engineering jobs that fits their professional and academic profile. Try to return engineering related careers. If the user enters a career related question, answer it.\n \n User Input: ";


    if (input) {
      let debouncer = setTimeout(() => {
        Axios.post(gptCallAddr, {
          prompt: inputprompt + input + "/n",
          temperature: 0.1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }).then((response) => {
          setOutput(response.data);
        });
        console.log(output);
      }, 1000);
      return () => {
        clearTimeout(debouncer);
      };
    }
  }, [input, funMode]); // we only want to ask GPT3 for response when user enters text so we listen specifically to 'input'

  // this tells any listeners to 'input' to update with 'input's new value passed in
  const handleChange = (e: any) => {
    setInput(e.target.value);
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
  }

  return (
    <div className="p-3 my-8 rounded">
      <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="gpt-input">
              Give a basic description of your interests to get career options or ask a question. Try to be specific... <br />
              
              Examples: <br />
                "I am a high school student enrolled in multiple advanced placement courses who attends a robotics orgnization after school." <br />

                "What steps do I need to take to become a mechanical engineer?" <br />

              You can also choose a pre-selected prompt from the options below. The top option is based on the previously generated response of GPT if you want more information. <br />


              </Label>
              <br />
              <Input id="gpt-input" type="textarea" value={input} onChange={handleChange}></Input>
            </FormGroup>
          </Form>
          <Button onClick={handleModeChange} color={redditButtonColor}> {redditButtonText} </Button>
        </CardBody>
      </Card>
      <p> {output} </p>
      <QuestionPresets setInput={setInput} output={output} />
    </div>
  );
}
