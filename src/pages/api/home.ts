// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getSession2 = await getSession({ req });
  const { user } = getSession2;
  console.log("this is the req");
  console.log(getSession2);
  console.log("user");
  console.log(user.email);
  res.status(200).json({ name: "Home name" });
}
