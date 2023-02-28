const HangmanWord: React.FC<{
  gussedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
}> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {props.wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
                props.gussedLetters.includes(letter) || props.reveal
                  ? "visible"
                  : "hidden",
                  color:
                  !props.gussedLetters.includes(letter) && props.reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
