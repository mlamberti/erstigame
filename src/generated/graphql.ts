import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type Group = {
  __typename?: 'Group',
  id: Scalars['ID'],
  name: Scalars['String'],
  users: Array<User>,
};

export type Hashtag = Node & {
  __typename?: 'Hashtag',
  description: Scalars['String'],
  id: Scalars['ID'],
  info: Scalars['String'],
  name: Scalars['String'],
  points: Scalars['Int'],
  repeatTime?: Maybe<Scalars['String']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  /** An example field added by the generator */
  testField: Scalars['String'],
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'],
};

export type Query = {
  __typename?: 'Query',
  allGroups: Array<Group>,
  allHashtags: Array<Hashtag>,
  allUsers: Array<User>,
  /** Find a group by ID */
  group?: Maybe<Group>,
  /** Find a user by ID */
  user?: Maybe<User>,
};


export type QueryGroupArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type User = {
  __typename?: 'User',
  group: Group,
  id: Scalars['ID'],
  info?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  picture?: Maybe<Scalars['String']>,
};
