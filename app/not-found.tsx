import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white

        flex
        flex-col
        items-center
        justify-center

        text-center
        p-8
      "
    >
      <h1
        className="
          text-8xl
          font-bold
          text-yellow-400
          mb-6
        "
      >
        404
      </h1>

      <h2
        className="
          text-3xl
          mb-4
        "
      >
        Page Not Found
      </h2>

      <p
        className="
          text-gray-400
          mb-8
        "
      >
        The page you are looking
        for does not exist.
      </p>

      <Link
        href="/"
        className="
          px-6
          py-3
          rounded-2xl

          bg-yellow-400
          hover:bg-yellow-300

          text-black
          font-bold

          transition
        "
      >
        Go Home
      </Link>
    </main>
  );
}