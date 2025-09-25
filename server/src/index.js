import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';

const typeDefs = `#graphql
  type Todo {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    todos: [Todo!]!
    todo(id: Int!): Todo
  }
`;

const resolvers = {
  Query: {
    todos: async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
      return data;
    },
    todo: async (_, { id }) => {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return data;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Servidor pronto em ${url}`);
