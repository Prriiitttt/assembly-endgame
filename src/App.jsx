import { useState, useEffect, useMemo } from "react";
import { languages } from "/src/languages";
import getFarewellText, { getRandomWord } from "./utils";
import Header from "./components/Header";
import Status from "./components/Status";
import clsx from "clsx";
import Confetti from "react-confetti";

export default function Hangman() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const farewellMessage = useMemo(() => {
    const lastLostLanguage =
      wrongGuessCount > 0 ? languages[wrongGuessCount - 1] : null;
    return lastLostLanguage ? getFarewellText(lastLostLanguage.name) : "";
  }, [wrongGuessCount]);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span
        key={language.name}
        className={`chip ${isLanguageLost ? "lost" : ""}`}
        style={styles}
      >
        {language.name}
      </span>
    );
  });

  const letterElement = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter",
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !isCorrect;

    return (
      <button
        onClick={() => addGuessedLetter(letter)}
        key={letter}
        className={clsx("keyboard-button", {
          guessed: isGuessed,
          correct: isCorrect,
          wrong: isWrong,
        })}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function addGuessedLetter(letter) {
    const isWrongGuess = guessedLetters.filter(
      (letter) => !currentWord.includes(letter),
    );

    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );

    if (isWrongGuess) {
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  }

  function handleKeyPress(event) {
    const key = event.key;

    if (isGameOver) {
      return;
    }

    if (alphabet.includes(key.toLowerCase())) {
      addGuessedLetter(key.toLowerCase());
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isGameOver]);

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main className={clsx("container", { shake: isShaking })}>
      {isGameWon && (
        <Confetti recycle={false} numberOfPieces={1000} gravity={0.3} />
      )}
      <Header />
      <Status
        gameWon={isGameWon}
        gameLost={isGameLost}
        farewellMsg={farewellMessage}
      />
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElement}</section>
      <section className="keyboardWord">{keyboardElements}</section>
      {isGameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
