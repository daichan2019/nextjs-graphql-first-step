import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client';
import { GetUsersAndTeamsDocument } from '../graphql/dist/generated-client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

function UsersAndTeams() {
  const { loading, error, data } = useQuery(GetUsersAndTeamsDocument);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const { users, teams } = data;

  return (
    <>
      <h1>Team List</h1>
      <ul>
        {teams.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
      <h1>User List</h1>
      <ul>
        {users.map(({ id, name, teamName }) => {
          return (
            <li key={id}>
              <b>{name}</b> belong {teamName} team
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <UsersAndTeams />
    </ApolloProvider>
  );
}
