// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPgClient } from "../../db";
import { getFeatureFlags } from "../../helpers/apiHelpers";
import { getCookie } from "cookies-next";
import NextCors from "nextjs-cors";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
    supportedHeaders: ["Content-Type", "Authorization"],
  });

  const client = await getPgClient();
  const featureFlags = await getFeatureFlags(client);
  const isCSRFEnabled = featureFlags.csrf;

  switch (req.method) {
    case "GET":
      if (isCSRFEnabled) {
        const password = req.query.password;
        const token = getCookie("token", { req, res });
        console.log("token: ", token);

        client.query("UPDATE users SET password = $1 WHERE token = $2", [
          password,
          token,
        ]);

        res.status(200).json({ message: "Password updated." });
      } else {
        res.status(403).json({ message: "Authorization needed" });
      }
      break;
    case "POST":
      const { password, token } = req.body;
      const tokenFromCookie = getCookie("token", { req, res });

      if (token === tokenFromCookie) {
        client.query("UPDATE users SET password = $1 WHERE token = $2", [
          password,
          token,
        ]);

        res.status(200).json({ message: "Password updated." });
      } else {
        res.status(403).json({ message: "Authorization needed" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed." });
      break;
  }
}
