// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createTable, fillTable } from "../../db/createTable";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await createTable();
  await fillTable();
  res.status(200).json({ message: "Table created." });
}
