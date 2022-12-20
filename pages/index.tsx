import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client';
import {
  GetUsersAndTeamsDocument,
  GetUserDocument,
} from '../graphql/dist/generated-client';
import { useState, memo } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

const User = memo(function User({ specifiedName }: { specifiedName: string }) {
  const { loading, error, data } = useQuery(GetUserDocument, {
    variables: { name: specifiedName },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const { user } = data;

  if (!user) return <p>user not found.</p>;

  const { id, name, teamName } = user;

  return (
    <div>
      <span>id: {id}</span>
      <br />
      <span>name: {name}</span>
      <br />
      <span>team {teamName}</span>
    </div>
  );
});

const UsersAndTeams = () => {
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
};

function SearchUser() {
  const [text, setText] = useState('');
  const [specifiedName, setSpecifiedName] = useState('');

  return (
    <>
      <h1>Search User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSpecifiedName(text);
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
      </form>
      <User specifiedName={specifiedName} />
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <UsersAndTeams />
      <SearchUser />
    </ApolloProvider>
  );
}
