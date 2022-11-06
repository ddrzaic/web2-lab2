import type { NextApiRequest, NextApiResponse } from "next";
import { getPgClient } from "../../db";
import { getFeatureFlags } from "../../helpers/apiHelpers";
import { isStringValid } from "../../helpers/utils";

type Data = {
  message: string;
  users?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const search = req.query.search;
      const client = await getPgClient();
      const featureFlags = await getFeatureFlags(client);

      if (!search) {
        const { rows } = await client.query(`SELECT name FROM users`);
        await client.end();
        res.status(200).json({ message: "Users fetched.", users: rows });
      }

      // SQL Injection allowed
      if (featureFlags.injection) {
        const query = `SELECT name FROM users WHERE name = '${search}'`;
        console.log("query: ", query);
        console.log("featureFlags: ", featureFlags);
        try {
          const { rows } = await client.query(query);
          await client.end();
          console.log(rows);
          res.status(200).json({ message: "success", users: rows });
        } catch (e) {}
      } else {
        // SQL Injection not allowed
        if (isStringValid(search as string)) {
          const { rows } = await client.query(
            `SELECT name FROM users WHERE name = $1`,
            [search]
          );
          await client.end();
          console.log(rows);
          res.status(200).json({ message: "success", users: rows });
        } else {
          res.status(204).json({ message: "Invalid request." });
        }
      }

      break;
    default:
      res.status(405).json({ message: "Method not allowed." });
      break;
  }
}
