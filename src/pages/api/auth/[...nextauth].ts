import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../models/user";
import dbConnect from "@/lib/dbConnect";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const user = await findUser(credentials)
        await dbConnect();
        console.log("trying catch user");
        // try {
        console.log("checkUser");

        let user: any = await User.findOne({
          email: credentials?.email,
        });
        console.log(user);
        if (user) {
          return user;
        } else {
          return null;
        }
        // console.log(user);
        // return checkUser;
        // } catch (e) {
        // console.log("error happened");
        // console.log(e);
        // return null;
        // }

        // console.log("bouta return some shite");
        // if (checkUser) {
        //   return checkUser;
        // } else {
        //   return null;
        // }
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // // Return null if user data could not be retrieved
        // return null;
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "secret",
  },
  // secret: "secret", // works the same but was included in code sample here:, so not sure:  https://github.com/Am4teur/nextauth-yt/blob/main/pages/api/auth/%5B...nextauth%5D.ts
});
// export default NextAuth(authOptions);
