import style from "./Keyboard.module.css";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Keyboard: React.FC<{
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled: boolean
}> = (props) => {
  return (
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
      gap: ".5rem",
    }}
    >
        {KEYS.map((key) => {
          const isActive = props.activeLetters.includes(key)
          const isInactive = props.inactiveLetters.includes(key)  

          return (
            <button
              onClick={() => props.addGuessedLetter(key)}
              disabled={isInactive || isActive || props.disabled}
              className={`${style.button} ${isActive ? style.active : ""} ${isInactive ? style.inactive : ""}`}
              key={key}
            >
              {key}
            </button>
          );
        })}
      
    </div>
  );
};

export default Keyboard;
