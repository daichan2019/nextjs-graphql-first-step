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

const addUser = (newUserName: string): User | null => {
  const user = users.find(({ name }) => name === newUserName);
  if (user) return null; // 同名のユーザーが存在した場合は null を返す
  const id = users.length + 1;
  const newUser: User = {
    id: String(id),
    name: newUserName,
    teamName: 'White', // 実装が面倒なのでチームは必ず White にするようにした
  };
  users.push(newUser);
  return newUser;
};

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    teams: () => teams,
    user: (_, { name: specifiedName }) => {
      const user = users.find(({ name }) => name === specifiedName);
      return user || null;
    },
  },
  Mutation: {
    addUser: (_, { name }) => addUser(name),
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
