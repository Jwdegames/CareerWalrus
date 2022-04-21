import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Axios from "axios";

const preset_questions: string[] = [
  "How do I choose a career?",
  "What's the typical career path in engineering?",
  "Where do engineers work?",
  "How long is an engineer's work day?",
  "What are the pros and cons of engineering?",
  "Do I have to learn how to code?",
  "What if some day I decide I want to do something else?",
];

export function QuestionPresets({ setInput, output }: { setInput: React.Dispatch<React.SetStateAction<string>>; output: string }) {
  // 1) Reacts to GPT3's own responses to generate follow up questions. Does not create an infinite loop because useEffect does not change any other useState variables
  const [followUpQuestion, setFollowUp] = useState("");

  useEffect(() => {
    const follow_up_primer: string = "Based on the following description, give me a follow up question: "; // space at the end is necessary for sentence cohesion
    if (output) {
      let debouncer = setTimeout(() => {
        Axios.post("/gpt/sendGPTPrompt", {
          prompt: follow_up_primer + output + "/n",
          temperature: 0.1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }).then((response) => {
          setFollowUp(response.data);
        });
        console.log(output);
      }, 1000);
      return () => {
        clearTimeout(debouncer);
      };
    }
  }, [output]);

  // 2) Shorthand functions to breakdown tasks to make coding more composed
  const callGPT3 = (question: string) => setInput(question); // handles calling GPT3 when button clicked

  // A shorthand component to build buttons that call GPT3 with questions
  const renderButton = (question: string) => <button onClick={() => callGPT3(question)}>{question}</button>; // lambda can be optimized for performance with useCallback to prevent rerender

  //  3) The list of questions, with followup appearing at top based on if output == '' or not
  return (
    <Table variant={"light"}>
      <tbody>
        {followUpQuestion ? (
          <tr>
            <th>{renderButton(followUpQuestion)}</th>
          </tr>
        ) : null}
        {preset_questions.map((question) => {
          return (
            <tr key={question}>
              <th>{renderButton(question)}</th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
