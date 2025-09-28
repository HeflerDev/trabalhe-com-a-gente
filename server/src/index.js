import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/usr/src/app/server/src/public/client/browser"));

  app.get("*", (req, res) => {
    res.sendFile("/usr/src/app/server/src/public/client/browser/index.html");
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `🚀 Servidor GraphQL rodando em: http://localhost:${PORT}/graphql`,
  );
  if (process.env.NODE_ENV === "production")
    console.log(`🌐 Servindo arquivos estáticos em: http://localhost:${PORT}/`);
});
