"use client";

import CreateRoom
from "@/components/lobby/CreateRoom";

import JoinRoom
from "@/components/lobby/JoinRoom";
import { useState } from "react";

export default function Home() {
  const [
  showHowToPlay,
  setShowHowToPlay,
] = useState(false);
  const [playerName, setPlayerName] =
  useState("");
  return (
    <main
  className="
    min-h-screen
    relative
    overflow-hidden
  "
>
  <div
    className="
      fixed
      inset-0
      bg-[url('/images/background.png')]
      bg-cover
      bg-center
      bg-no-repeat
      -z-20
    "
  />
  {/* Dark Overlay */}
  <div
    className="
      absolute
      inset-0
      bg-black/75
      backdrop-blur-[2px]
    "
  />

  {/* Content */}
  <div
    className="
      relative
      z-10
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      px-6
    "
  >
    <button
  onClick={() =>
    setShowHowToPlay(
      true
    )
  }
  className="
    absolute
    top-6
    right-6
    bg-black/50
    hover:bg-black/70
    border
    border-white/20
    px-5
    py-3
    rounded-2xl
    backdrop-blur-md
    transition
    font-semibold
    text-yellow-400
    shadow-lg
  "
>
  How To Play ?
</button>
    {/* Title */}
    <h1
      className="
        text-6xl
        md:text-7xl
        text-yellow-400
        font-bold
        mb-14
        drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
        tracking-wide
      "
    >
      Judgement Multiplayer
    </h1>

    {/* Main Card */}
    <div
      className="
        w-full
        max-w-xl
        bg-black/25
        border
        border-white/10
        rounded-3xl
        p-8
        backdrop-blur-md
        shadow-2xl
        flex
        flex-col
        gap-6
      "
    >
      {/* Name Input */}
      <div className="flex flex-col gap-4">
        <label
          className="
            text-white
            text-lg
            font-semibold
          "
        >
          Enter name to create or join room
        </label>

        <input
          type="text"
          placeholder="Your name (max 10 chars)"
          maxLength={10}
          value={playerName}
          onChange={(e) =>
            setPlayerName(
              e.target.value
            )
          }
          className="
            w-full
            px-5
            py-4
            rounded-2xl
            bg-white/90
            text-black
            text-lg
            outline-none
            focus:ring-4
            focus:ring-yellow-400
          "
        />
      </div>

      {/* Create Room */}
      <div className="w-full flex justify-center">
        <CreateRoom
          playerName={
            playerName
          }
        />
      </div>

      {/* Join Room Section */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          items-center
        "
      >
        <JoinRoom
          playerName={
            playerName
          }
        />
      </div>
    </div>
  </div>
 {showHowToPlay && (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-sm
      px-4
    "
  >
    <div
      className="
        relative
        w-full
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        bg-black/80
        border
        border-white/10
        rounded-3xl
        p-8
        text-white
        shadow-2xl
        custom-scrollbar
      "
    >
      {/* Close Button */}
      <button
        onClick={() =>
          setShowHowToPlay(
            false
          )
        }
        className="
          absolute
          top-4
          right-4
          w-10
          h-10
          rounded-full
          bg-red-500
          hover:bg-red-600
          text-white
          text-xl
          font-bold
          transition
        "
      >
        ✕
      </button>

      <h2
        className="
          text-4xl
          font-bold
          mb-6
          text-yellow-400
        "
      >
        How To Play
      </h2>

      <div className="space-y-6">
        {/* Intro */}
        <div>
          <h3
            className="
              text-2xl
              font-semibold
              mb-2
            "
          >
            What is Judgement /
            Kachuful?
          </h3>

          <p
            className="
              text-lg
              text-gray-400
              leading-8
            "
          >
            Judgement (also
            known as Kachuful)
            is a multiplayer
            trick-taking card
            game where players
            predict how many
            tricks they will
            win each round.
            Smart prediction and
            strategic card play
            decide the winner.
          </p>
        </div>

        {/* Rules */}
        <div>
          <h3
            className="
              text-2xl
              font-semibold
              mb-4
            "
          >
            Rules
          </h3>

          <ul
            className="
              space-y-4
              text-lg
              text-gray-400
              list-disc
              pl-6
            "
          >
            <li>
              Every player predicts
              how many tricks
              they think they
              can win.
            </li>

            <li>
              Prediction order
              rotates every
              round.
            </li>

            <li>
              Trump suit changes
              every round.
            </li>

            <li>
              Players must
              follow suit if
              possible.
            </li>

            <li>
              Trump cards beat
              all non-trump
              cards.
            </li>

            <li>
              If no trump card
              is played, highest
              lead suit wins.
            </li>

            <li>
              Correct prediction gives
              points while wrong
              prediction gives zero.
            </li>

            <li>
              If equal cards are
              played from
              multiple decks,
              the latest played
              card wins.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)}
</main>
  );
}