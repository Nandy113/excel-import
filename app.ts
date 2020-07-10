import * as Client from "./database/db";
import { CosmosClient } from "@azure/cosmos";
import * as schema from "./excel-schema/schema";
import * as readXlsxFile from "read-excel-file/node";
import * as config from "./database/config";

const databaseId = config.databaseId;
const containerId = config.containerId;
const client = new CosmosClient(Client.options);

async function excelToJson() {
  const file = __dirname + "assets\\Book2.xlsx";
  let { rows, error } = await readXlsxFile(file, { schema });
  await addToDb(rows);
}

excelToJson();

async function addToDb(datas : any) {
  const container = client.database(databaseId).container(containerId);
  const creates = [];
  for (const data of datas) {
    creates.push(container.items.create(data));
  }
  return Promise.all(creates);
}
