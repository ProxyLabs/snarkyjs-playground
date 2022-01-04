import pkg from 'pg'
const { Client } = pkg
import { config } from 'dotenv'
config()
/*

-- SQL structure
CREATE TABLE projects (
  project_id varchar(16) NOT NULL UNIQUE,
  project_name varchar(32) DEFAULT '',
  project_code text DEFAULT '',
  PRIMARY KEY (project_id)
);
*/

function getClient() {
  const client = new Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER_SNARKYJS_PLAYGROUND,
    database: 'snarkyjs_playground',
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD,
  })
  return client
}

export default async function executeQuery(query = '', values = null) {
  const client = getClient()
  client.connect()
  let res
  if (values == null) res = await client.query(query)
  else res = await client.query(query, values)

  await client.end()

  return res.rows
}
