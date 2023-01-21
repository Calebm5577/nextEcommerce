import React from "react";
import { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

// export default function signin() {
//   const [auth, setAuth] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   console.log(auth.name);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setAuth((prevstate) => {
//       return {
//         ...prevstate,
//         [name]: value,
//       };
//     });
//   };

//   //register
//   const register = () => {};

//   return (
//     <div>
//       <input
//         name="name"
//         value={auth.name}
//         placeholder="name"
//         onChange={handleChange}
//       />
//       <input
//         name="email"
//         value={auth.email}
//         placeholder="email"
//         onChange={handleChange}
//       />
//       <input
//         name="password"
//         value={auth.password}
//         placeholder="password"
//         onChange={handleChange}
//       />
//       <button onClick={register}>Submit</button>
//     </div>
//   );
// }

export default function Component() {
  // const { data: session } = useSession();
  // if (session) {
  //   return (
  //     <div>
  //       Signed in ! <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </div>
  //   );
  // }

  const testFunc = async () => {
    console.log("started testFunc");
    let req = await fetch("http://localhost:3000/api/home");
    console.log(req);
  };
  return (
    <>
      <div
        className="h-screen w-screen border border-sky-500
        flex flex-col gap-10 items-center justify-center "
      >
        {/* <Link href="/signin">go signin</Link> */}
        <h1 className="text-3xl font-bold underline">
          Sign In Page if not logged in
        </h1>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
        <div>
          <p>click some shit</p>
          <button onClick={testFunc}>test</button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
