import { useState } from "react";
import { languages } from "/src/languages";
import Header from "./components/Header";
import Status from "./components/Status";
import clsx from "clsx";

export default function Hangman() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [currentWord, setCurrentWord] = useState("python");
  const [guessedLetters, setGuessedLetters] = useState([]);

  console.log(guessedLetters);

  const languageElements = languages.map((language) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span key={language.name} className="chip" style={styles}>
        {language.name}
      </span>
    );
  });

  const letterElement = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    return <span key={index}>{isGuessed ? letter.toUpperCase() : ""}</span>;
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
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  return (
    <main className="container">
      <Header />
      <Status />
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElement}</section>
      <section className="keyboardWord">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
