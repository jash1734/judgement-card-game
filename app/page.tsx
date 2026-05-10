"use client";

import CreateRoom
from "@/components/lobby/CreateRoom";

import JoinRoom
from "@/components/lobby/JoinRoom";
import { useState } from "react";

export default function Home() {
  const [playerName, setPlayerName] =
  useState("");
  return (
    <main
  className="
    min-h-screen
    bg-[url('/images/background.png')]
    bg-cover
    bg-center
    bg-no-repeat
    relative
    overflow-hidden
  "
>
  {/* Dark Overlay */}
  <div
    className="
      absolute
      inset-0
      bg-black/55
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
    {/* Title */}
    <h1
      className="
        text-6xl
        md:text-7xl
        text-white
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
        bg-black/45
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
      <div className="flex flex-col gap-2">
        <label
          className="
            text-white
            text-lg
            font-semibold
          "
        >
          Enter Name
        </label>

        <input
          type="text"
          placeholder="Your name"
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
</main>
  );
}