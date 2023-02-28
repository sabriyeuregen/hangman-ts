import { useCallback, useEffect, useState } from "react";
import data from "./wordList.json";
import Keyboard from "./components/Keyboard/Keyboard";
import HangmanDrawing from "./components/HangmanDrawing/HangmanDrawing";
import HangmanWord from "./components/HangmanWord/HangmanWord";

function getWord() {
  return data[Math.floor(Math.random() * data.length)]
}

const App: React.FC = () => {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return data[Math.floor(Math.random() * data.length)];
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6 
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGussedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGussedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])


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
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try"}
      </div>
      <HangmanDrawing numberOfGusses={incorrectLetters.length} />
      <HangmanWord gussedLetters={guessedLetters} wordToGuess={wordToGuess} reveal={isLoser}/>
      <div style={{alignSelf: "stretch"}}>
        <Keyboard activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
         inactiveLetters={incorrectLetters} addGuessedLetter={addGussedLetter}
         disabled={isWinner || isLoser}
        />
      </div>
    </div>
  );
};

export default App;
