import { Form, FormGroup, Label, Input, Card, CardBody, CardText } from "reactstrap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { QuestionPresets } from "./question-presets/presets";

export default function FormBox() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [GPT3Cache, setGPT3Cache] = useState("");

  // Calls new GPT3 API request only when gpt3Input changes

  const callGPT3 = () => {
    let inputprompt =
      "Use the following summary of an individual's interests to generate a list of comma-seperated engineering jobs that fits their professional and academic profile. Try to return engineering related careers. If the user enters a career related question, answer it.\n \n User Input: ";
    if (GPT3Cache) {
      Axios.post("/gpt/sendGPTPrompt", {
        prompt: inputprompt + GPT3Cache + "/n",
        temperature: 0.1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then((response) => {
        setOutput(response.data);
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

  return (
    <div className="p-3 my-8 rounded">
      <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="gpt-input">Give a basic description of your interests to get career options or ask a question. Try to be specific... </Label>
              <br />
              <Input id="gpt-input" type="textarea" value={input} onChange={handleChange} onKeyPress={handleKeyPress}></Input>
            </FormGroup>
          </Form>
          <button onClick={() => setGPT3Cache(input)}>Enter</button>
        </CardBody>
      </Card>
      <p> {output} </p>
      <QuestionPresets setInput={presetCaller} output={output} />
    </div>
  );
}
