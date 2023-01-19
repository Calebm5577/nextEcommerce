import React from "react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in ! <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
