import { useState } from "react";
import { languages } from "/src/languages";
import Header from "./components/Header";
import Status from "./components/Status";

export default function Hangman() {

  const [currentWord, setCurrentWord] = useState("react")

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

  const letterElement = currentWord.split("").map((letter, index) => (
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const keyboardElements = alphabet.split("").map((letter) => (
    <button key={letter}>{letter.toUpperCase()}</button>
  ))

  return (
    <main className="container">
      <Header />
      <Status />
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElement}</section>
      <section className="keyboardWord">{keyboardElements}</section>
    </main>
  );
}