import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hello");
  console.log(req.headers);
  res.status(200).json({ name: "sample ts" });
}
