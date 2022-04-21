import { Table } from "reactstrap";

export function QuestionPresets({ setInput }: { setInput: React.Dispatch<React.SetStateAction<string>> }) {
  const callGPT3 = (question: string) => setInput(question);

  const preset_questions: string[] = [
    "How do I choose a career?",
    "What's the typical career path in engineering?",
    "Where do engineers work?",
    "How long is an engineer's work day?",
    "What are the pros and cons of engineering?",
    "Do I have to learn how to code?",
    "What if some day I decide I want to do something else?",
  ];

  return (
    <Table variant={"light"}>
      <tbody>
        {preset_questions.map((question) => {
          return (
            <tr key={question}>
              <th>
                <button onClick={() => callGPT3(question)}>{question}</button> {/** lambda can be optimized for performance with useCallback to prevent rerender  */}
              </th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
