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

const corsOptions = {
  origin: [
    "https://api.thecatapi.com",
    process.env.NODE_ENV === "production"
      ? "http://54.226.76.58:4000"
      : "http://localhost:4200",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
/*
 * Since production environment is built on Docker, no need to use path
 * to locate the static files, just use the absolute path.
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/usr/src/app/server/src/public/client/browser"));

  app.get("/", (req, res) => {
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
  cors(corsOptions),
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
