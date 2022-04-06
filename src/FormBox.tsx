import { Form, FormGroup, Label, Input, Card, CardBody, CardText } from "reactstrap";
import React, { useEffect, useState } from "react";

export default function FormBox() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  console.log(process.env);

  // Sets up a listener that returns GPT3's response to a user's inputted text
  useEffect(() => {
    if (input) {
      const fetchGPTResponse = async () => {

        let inputprompt = "Use the following summary of an individual's interests to generate a list of comma-seperated engineering jobs that fits their professional and academic profile. Try to return engineering related careers. If the user enters a career related question, answer it.\n \n User Input:"

        const response = await openai.createCompletion("text-davinci-002", {
          prompt: inputprompt + input + "\n",
          temperature: 0.1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        setOutput(response.data.choices[0].text);
      };

      let debouncer = setTimeout(() => {
        fetchGPTResponse();
        console.log(output);
      }, 1000);
      return () => {
        clearTimeout(debouncer); // cancels last-minute requests that didn't finish when the user closes tab
      };
    }
  }, [input]); // we only want to ask GPT3 for response when user enters text so we listen specifically to 'input'

  // this tells any listeners to 'input' to update with 'input's new value passed in
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <div className="p-3 my-8 rounded">
      <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="gpt-input">Give a basic description of your interests to get career options or ask a question. Try to be specific... </Label>
              <br />
              <Input id="gpt-input" type="textarea" onChange={handleChange}></Input>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <p> { output } </p>
    
      </div>
  );
}
