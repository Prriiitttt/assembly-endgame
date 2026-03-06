import clsx from "clsx";

export default function Status({ gameWon, gameLost, farewellMsg }) {
  const gameOver = gameWon || gameLost;

  return (
    <section
      className={clsx("game-status", {
        "won-status": gameWon,
        "lost-status": gameLost,
        status: !gameOver,
      })}
      aria-live="polite"
      role="status"
    >
      {!gameOver && farewellMsg && (
        <p className="farewell-text">{farewellMsg}</p>
      )}

      {gameWon && (
        <>
          <h2>You win!</h2>
          <p>Well done!🎉</p>
        </>
      )}

      {gameLost && (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )}
    </section>
  );
}
