import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const testFunc = async () => {
    console.log("started testFunc");
    let req = await fetch("http://localhost:3000/api/home");
    console.log(req);
  };
  return (
    // <>
    <div
      className="h-screen w-screen border border-sky-500
        flex flex-col gap-10 items-center justify-center "
    >
      <Link href="/signin">go signin</Link>
      <h1 className="text-3xl font-bold underline">Hello</h1>
      <div>
        <button onClick={() => signOut()}>signout</button>
      </div>
      <div>
        <p>click some shit</p>
        <button onClick={testFunc}>test</button>
      </div>
    </div>
    // </>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
