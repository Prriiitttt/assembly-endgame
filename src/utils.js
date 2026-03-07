import { words } from "./words";

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

export default function getFarewellText(language) {
    const options = [
        `Nice going, dumbass. Now code without ${language}`,
        `Congrats, you just lost ${language}. Fucking brilliant`,
        `Oh look, another mistake. Say goodbye to ${language}`,
        `You really suck at this. ${language} is gone because of you`,
        `Wow, you're terrible. There goes ${language}`,
        `Pathetic. You just killed ${language}`,
        `Are you even trying? ${language} is dead thanks to you`,
        `Smooth move, idiot. ${language} has left the chat`,
        `You absolute clown, you lost ${language}`,
        `What's wrong with you? ${language} deserved better`,
        `Seriously? You just threw away ${language} like a moron`,
        `Hope you're proud. ${language} is gone forever because you fucked up`,
        `Great job, genius. Now suffer without ${language}`,
        `You really thought that would work? Bye bye ${language}`,
        `Fucking hell, you're bad at this. ${language} is history`,
        `Congrats on being useless. ${language} won't be coming back`,
        `Loser move. ${language} wants nothing to do with you now`,
        `Did your brain take a break? ${language} just died on your watch`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}