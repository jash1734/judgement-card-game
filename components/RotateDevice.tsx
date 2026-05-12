"use client";

import {
  useEffect,
  useState,
} from "react";

export default function RotateDevice() {

  const [
    showOverlay,
    setShowOverlay,
  ] = useState(false);

  useEffect(() => {

    function checkOrientation() {

  const isPortrait =
    window.innerHeight >
    window.innerWidth;

  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

  setShowOverlay(
    isPortrait &&
    isMobile
  );
}

    checkOrientation();

    window.addEventListener(
      "resize",
      checkOrientation
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkOrientation
      );

  }, []);

  if (!showOverlay) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[999999]

        bg-black

        flex
        flex-col
        items-center
        justify-center

        text-white
        text-center

        p-8
      "
    >
      <div className="text-7xl mb-6">
        📱
      </div>

      <h1
        className="
          text-3xl
          font-bold
          mb-4
        "
      >
        Rotate Your Device
      </h1>

      <p
        className="
          text-lg
          text-gray-300
          max-w-md
        "
      >
        This game is best
        experienced in
        landscape mode.
      </p>
    </div>
  );
}