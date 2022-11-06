import { Client } from "pg";

const config = {
  ssl: true,
};

export const getPgClient = async () => {
  const client = new Client(config);
  await client.connect();
  return client;
};
