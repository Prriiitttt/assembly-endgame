import { useState } from "react";
import { languages } from "/src/languages";
import Header from "./components/Header";
import Status from "./components/Status";
import clsx from "clsx";

export default function Hangman() {
  const [currentWord, setCurrentWord] = useState("abcde");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost

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
      <Status gameWon={isGameWon} gameLost={isGameLost}/>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElement}</section>
      <section className="keyboardWord">{keyboardElements}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
