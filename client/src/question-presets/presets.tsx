import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "reactstrap";
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
  const [spinnerHidden, hideSpinner] = useState(true); // hide spinner initial b/c not load anything

  useEffect(() => {
    const follow_up_primer: string = "Based on the following description, give me a follow up question: "; // space at the end is necessary for sentence cohesion
    if (output) {
      hideSpinner(false);
      Axios.post("/gpt/sendGPTPrompt", {
        prompt: follow_up_primer + output + "/n",
        temperature: 0.1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then((response) => {
        setFollowUp(response.data.trim());
        hideSpinner(true);
      });
    }
  }, [output]);

  // 2) Shorthand functions to breakdown tasks to make coding more composed

  // A shorthand component to build buttons that call GPT3 with questions
  const renderButton = (question: string) => (
    <Button className="static-question" color="primary" size="lg" onClick={() => setInput(question)}>
      {" "}
      {question}{" "}
    </Button>
  ); // lambda can be optimized for performance with useCallback to prevent rerender

  // Necessary for fade in animation to trigger for every new dynamic preset question generated.
  useEffect(() => {
    const myEl: HTMLElement | null = document.getElementById("DynamicPreset");
    if (myEl) {
      myEl.classList.add("animate");
      let debouncer = setTimeout(() => {
        myEl.classList.remove("animate");
      }, 500); //! 500 sec must be synced up with 'fadeIt 0.5s' in presets.css
      return () => {
        clearTimeout(debouncer);
      };
    }
  }, [followUpQuestion]);

  //  3) The list of questions, with followup appearing at top based on if output == '' or not
  return (
    <div className="PresetGroup">
      {followUpQuestion ? (
        <div className="Question">
          <Button className="DynamicQuestion" id="DynamicPreset" color="success" size="lg" onClick={() => setInput(followUpQuestion)}>
            {spinnerHidden ? null : (
              <Spinner color="primary" size="">
                Loading...
              </Spinner>
            )}
            {followUpQuestion}
          </Button>
        </div>
      ) : null}
      {preset_questions.map((question) => {
        return (
          <div className="Question" key={question}>
            {renderButton(question)}
          </div>
        );
      })}
    </div>
  );
}
