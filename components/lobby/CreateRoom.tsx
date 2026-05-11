"use client";

import { useRouter }
from "next/navigation";

import { generateRoomCode }
from "@/utils/room";

type Props = {
  playerName: string;
};

export default function CreateRoom({
  playerName,
}: Props) {
  const router =
    useRouter();

  function handleCreateRoom() {
    const roomCode =
      generateRoomCode();

    router.push(
      `/room/${roomCode}?name=${playerName}`
    );
  }

  return (
    <button
      disabled={
        !playerName.trim()
      }
      onClick={
        handleCreateRoom
      }
      className="
        bg-blue-500
        hover:bg-blue-600
        disabled:bg-gray-500
        disabled:cursor-not-allowed
        text-white
        px-6
        py-3
        rounded-xl
        font-bold
      "
    >
      Create Room
    </button>
  );
}