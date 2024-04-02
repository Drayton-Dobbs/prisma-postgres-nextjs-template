import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen h-full bg-[#121212] flex justify-center items-center">
      <Link
        href={"/createAccount"}
        className="text-white border px-4 py-2 cursor-pointer hover:bg-[#333333]"
      >
        Create Account
      </Link>
    </main>
  );
}
