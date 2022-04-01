import { Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import React, {useEffect , useState} from 'react';

export function FormBox() {
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
    apiKey: "[]",
    });
    const openai = new OpenAIApi(configuration);

    useEffect(() => {
        if (input) {
            const fetchGPTResponse = async() => {
            const response = await openai.createCompletion("text-davinci-002", {
                prompt: input + "\n",
                temperature: 0.7,
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
                clearTimeout(debouncer);
            } 
        }


    }, [input]);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return(
        <>
            <Card style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CardBody>
            <Form>
                <FormGroup>
                    <Label for="gpt-input">
                        Enter a prompt...
                    </Label>
                    <br />
                    <Input id="gpt-input" type="text" onChange={ handleChange }></Input>
                </FormGroup>
            </Form>
            <p> {output} </p>
            </CardBody>
            </Card>
        </>
    );
}