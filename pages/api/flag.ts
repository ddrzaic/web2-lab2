// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPgClient } from "../../db/index";
import { isStringValid } from "../../helpers/utils";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PATCH":
      const client = await getPgClient();
      const { name, isActivated } = req.body;
      if (isStringValid(name) && typeof isActivated === "boolean") {
        await client.query(
          `UPDATE flags SET isActivated = ${isActivated} WHERE name = '${name}'`
        );
        await client.end();
        res.status(200).json({ message: "Flag updated." });
      } else {
        res.status(400).json({ message: "Invalid request." });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed." });
      break;
  }
}
