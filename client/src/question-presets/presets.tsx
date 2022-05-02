import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import Axios from "axios";
import "./presets.css";

interface PresetProps {
  setInput: (input: string) => void;
  output: string;
}

const preset_questions: string[] = ["How do I choose a career?", "I like animals, what engineering careers suit me?", "I like to swim.", "What's the typical career path in engineering?", "Do I have to learn how to code?"];

export function QuestionPresets({ setInput, output }: PresetProps) {
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
          setFollowUp(response.data.trim());
        });
      }, 1000);
      return () => {
        clearTimeout(debouncer);
      };
    }
  }, [output]);

  // 2) Shorthand functions to breakdown tasks to make coding more composed

  // A shorthand component to build buttons that call GPT3 with questions
  const renderButton = (question: string) => (
    <Button color="primary" size="lg" onClick={() => setInput(question)}>
      {" "}
      {question}{" "}
    </Button>
  ); // lambda can be optimized for performance with useCallback to prevent rerender

  //  3) The list of questions, with followup appearing at top based on if output == '' or not
  return (
    <div className="PresetGroup">
      {followUpQuestion ? <div className="Question">{renderButton(followUpQuestion)}</div> : null}
      {preset_questions.map((question) => {
        return <div className="Question">{renderButton(question)}</div>;
      })}
    </div>
  );
}
