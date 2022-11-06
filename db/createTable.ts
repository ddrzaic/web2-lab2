import { getPgClient } from ".";

export const createTable = async () => {
  const client = await getPgClient();
  await client.query(
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        token VARCHAR(255)
        )`
  );
  await client.query(
    `CREATE TABLE IF NOT EXISTS flags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        isActivated BOOLEAN
        )`
  );
  await client.end();
};

export const fillTable = async () => {
  const client = await getPgClient();
  await client.query(
    `INSERT INTO users (name, email, password, token) VALUES
            ('John', 'john@email.com', '123456', 'asjdkhkj12312___213s'),
            ('Jane', 'jane@email.com', '123456', 'fdskjsdf_sdffs434'),
            ('Jack', 'jack@email.com', '123456', 'ewqedddwqdqw_vdasd222'),
            ('Jill', 'jill@email.com', '123456', 'dadaswqeqw_dsadsad2'),
            ('Jenny', 'jenny@email.com', '123456', 'kjlkjwqe2534535___234324'),
            ('Jen', 'jen@email.com', '123456', '__234234__34gfg'),
            ('Jenifer', 'jenifer@email.com', '123456', '42r56gegdg_65_gfd546_Gdf')`
  );
  await client.query(
    `INSERT INTO flags (name, isActivated) VALUES
            ('injection', true),
            ('csrf', true)`
  );
  await client.end();
};
