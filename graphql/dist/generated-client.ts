import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<User>;
};


export type MutationAddUserArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  teams: Array<Team>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  name: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  teamName: Scalars['String'];
};

export type GetUsersNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersNameQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name: string }> };

export type GetUsersAndTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersAndTeamsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, teamName: string }>, teams: Array<{ __typename?: 'Team', id: string, name: string }> };

export type GetUserQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, teamName: string } | null };

export type AddUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'User', id: string } | null };


export const GetUsersNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersName"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUsersNameQuery, GetUsersNameQueryVariables>;
export const GetUsersAndTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersAndTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUsersAndTeamsQuery, GetUsersAndTeamsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;