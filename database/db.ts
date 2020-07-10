import * as  https from "https";
import * as config from "./config";

const endpoint = config.endpoint;
const key = config.key;

export const options = {
    endpoint: endpoint,
    key: key,
    userAgentSuffix: "CosmosDBJavascriptQuickstart",
    agent: new https.Agent({
        rejectUnauthorized: false,
    }),
};
