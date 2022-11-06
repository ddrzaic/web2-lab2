import { Client } from "pg";

export const getFeatureFlags = async (client: Client) => {
  const { rows } = await client.query(`SELECT * FROM flags`);
  const featureFlags = rows.reduce((acc, flag) => {
    acc[flag.name] = flag.isactivated;
    return acc;
  }, {});
  return featureFlags;
};
