import { useState } from "react";
import Header from "./components/Header";
import Status from "./components/Status";
import { languages } from "/src/languages";

export default function Hangman() {
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

  return (
    <>
      <Header />
      <Status />
      <section className="language-chips">{languageElements}</section>
    </>
  );
}

/**
 * Goal: Build out the main parts of our app
 *
 * Challenge: Create the language chips. Use the
 * `languages.js` file to pull in the array of
 * languages to use, which contains the language
 * name, background color, and text color.
 *
 * Hint for layout: use a flex container that can wrap
 * to layout the languages.
 */
