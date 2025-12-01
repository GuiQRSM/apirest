var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"), 1);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid enviroments variables!", _env.error.format());
  throw new Error("Invalid enviroments variables!");
}
var env = _env.data;

// src/routes/transactions.ts
var import_zod2 = __toESM(require("zod"), 1);

// src/database.ts
var import_knex = __toESM(require("knex"), 1);
var setupKnex = import_knex.default;
var config = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knexInstance = setupKnex(config);

// src/routes/transactions.ts
var import_node_crypto = require("crypto");
async function transactionsRoutes(app2) {
  app2.post("/", async (request, reply) => {
    const createTransactionBodySchema = import_zod2.default.object({
      title: import_zod2.default.string(),
      amount: import_zod2.default.number(),
      type: import_zod2.default.enum(["credit", "debit"])
    });
    const { title, amount, type } = createTransactionBodySchema.parse(request.body);
    await knexInstance("transactions").insert({
      id: (0, import_node_crypto.randomUUID)(),
      title,
      amount: type === "credit" ? amount : amount * -1
    });
    return reply.status(201).send();
  });
}

// src/server.ts
var app = (0, import_fastify.default)();
app.register(transactionsRoutes, {
  prefix: "transactions"
});
app.listen({
  port: env.PORT
}).then(() => {
  console.log("HTTP Server is running");
});
