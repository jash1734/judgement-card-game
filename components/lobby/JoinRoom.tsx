"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

type Props = {
  playerName: string;
};

export default function JoinRoom({
  playerName,
}: Props) {
  const [roomCode, setRoomCode] =
    useState("");

  const router =
    useRouter();

  function handleJoinRoom() {
    if (!roomCode.trim()) {
      return;
    }

    router.push(
      `/room/${roomCode}?name=${playerName}`
    );
  }

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) =>
          setRoomCode(
            e.target.value
          )
        }
        className="
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

      <button
        disabled={
          !playerName.trim()
        }
        onClick={
          handleJoinRoom
        }
        className="
          bg-green-500
          hover:bg-green-600
          disabled:bg-gray-500
          text-white
          px-6
          py-3
          rounded-xl
          font-bold
        "
      >
        Join Room
      </button>
    </div>
  );
}