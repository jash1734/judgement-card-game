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
        bg-green-900
        flex
        flex-col
        items-center
        justify-center
        gap-8
        p-6
      "
    >
      <h1
        className="
          text-6xl
          text-white
          font-bold
        "
      >
        Judgement Multiplayer
      </h1>
      <input
  type="text"
  placeholder="Enter your name"
  value={playerName}
  onChange={(e) =>
    setPlayerName(
      e.target.value
    )
  }
  className="
    px-4
    py-3
    rounded-xl
    text-black
    w-full
    mb-4
  "
/>
      <CreateRoom playerName={
    playerName
  }/>

      <JoinRoom playerName={
    playerName
  }/>
    </main>
  );
}