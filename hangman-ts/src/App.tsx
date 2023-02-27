import { useState } from "react";
import data from "./wordList.json";
import Keyboard from "./components/Keyboard/Keyboard";
import HangmanDrawing from "./components/HangmanDrawing/HangmanDrawing";
import HangmanWord from "./components/HangmanWord/HangmanWord";

const App: React.FC = () => {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return data[Math.floor(Math.random() * data.length)];
  });

  const [gussedLetters, setGussedLetters] = useState<string[]>([]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>
      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />
    </div>
  );
};

export default App;
