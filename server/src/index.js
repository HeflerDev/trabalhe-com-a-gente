import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers/index.js";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: {
    origin: ["http://localhost:4200"],
    credentials: true,
  },
});

console.log(`🚀 Servidor GraphQL rodando em: ${url}`);
