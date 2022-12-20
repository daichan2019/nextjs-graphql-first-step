import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { readFileSync } from 'fs';
import { join } from 'path';

import { Resolvers } from '../../graphql/dist/generated-server';

const path = join(process.cwd(), 'graphql', 'schema.graphql');
const typeDefs = readFileSync(path).toString('utf-8');

type Team = 'Red' | 'White';

const teams: { id: string; name: Team }[] = [
  { id: '1', name: 'Red' },
  { id: '2', name: 'White' },
];

type User = { id: string; name: string; teamName: Team };

const users: User[] = [
  { id: '1', name: 'Alice', teamName: 'Red' },
  { id: '2', name: 'Bob', teamName: 'Red' },
  { id: '3', name: 'Carol', teamName: 'White' },
];

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    teams: () => teams,
    user: (_, { name: specifiedName }) => {
      const user = users.find(({ name }) => name === specifiedName);
      return user || null;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
