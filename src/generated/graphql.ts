import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};



/** Autogenerated return type of AddGroupRallyeRating */
export type AddGroupRallyeRatingPayload = {
  __typename?: 'AddGroupRallyeRatingPayload',
  errors?: Maybe<Array<Scalars['String']>>,
  rallyeRating?: Maybe<RallyeRating>,
};

/** Autogenerated return type of CreatePhoto */
export type CreatePhotoPayload = {
  __typename?: 'CreatePhotoPayload',
  errors?: Maybe<Array<Scalars['String']>>,
  photo?: Maybe<Photo>,
};

/** Autogenerated return type of CreateUser */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload',
  authToken?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Scalars['String']>>,
  user?: Maybe<User>,
};

export enum GenderEnum {
  Maschi = 'MASCHI',
  Maschine = 'MASCHINE',
  Pinguin = 'PINGUIN'
}

export type Group = Node & {
  __typename?: 'Group',
  createdAt?: Maybe<Scalars['String']>,
  hashtags?: Maybe<Array<Hashtag>>,
  id: Scalars['ID'],
  level: Level,
  name: Scalars['String'],
  numCatches: Scalars['Int'],
  numHours: Scalars['Float'],
  numPlaces: Scalars['Int'],
  numSponsors: Scalars['Int'],
  photos: Array<Photo>,
  points: Scalars['Int'],
  rallyeRatings: Array<RallyeRating>,
  updatedAt?: Maybe<Scalars['String']>,
  users: Array<User>,
};

export type Hashtag = Node & {
  __typename?: 'Hashtag',
  category?: Maybe<HashtagCategory>,
  createdAt?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  doable?: Maybe<Scalars['Boolean']>,
  done?: Maybe<Scalars['Boolean']>,
  id: Scalars['ID'],
  info: Scalars['String'],
  level?: Maybe<Level>,
  name: Scalars['String'],
  picture?: Maybe<Scalars['String']>,
  points: Scalars['Int'],
  repeatTime?: Maybe<Scalars['String']>,
  repeatable?: Maybe<Scalars['Boolean']>,
  repeatableAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};

export enum HashtagCategory {
  Catch = 'CATCH',
  Sponsor = 'SPONSOR',
  Place = 'PLACE'
}

export type Level = Node & {
  __typename?: 'Level',
  createdAt?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  numCatches: Scalars['Int'],
  numHours: Scalars['Int'],
  numPlaces: Scalars['Int'],
  numSponsors: Scalars['Int'],
  rank: Scalars['Int'],
  requiredHashtags?: Maybe<Array<Hashtag>>,
  updatedAt?: Maybe<Scalars['String']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  addGroupRallyeRating?: Maybe<AddGroupRallyeRatingPayload>,
  createPhoto?: Maybe<CreatePhotoPayload>,
  createUser?: Maybe<CreateUserPayload>,
};


export type MutationAddGroupRallyeRatingArgs = {
  token: Scalars['String']
};


export type MutationCreatePhotoArgs = {
  peopleCount: Scalars['Int'],
  hashtagIds: Array<Scalars['ID']>,
  picture: Scalars['Upload']
};


export type MutationCreateUserArgs = {
  name: Scalars['String'],
  groupToken: Scalars['String'],
  gender?: Maybe<GenderEnum>,
  info?: Maybe<Scalars['String']>
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'],
};

export type Photo = Node & {
  __typename?: 'Photo',
  createdAt?: Maybe<Scalars['String']>,
  date: Scalars['String'],
  group: Group,
  hashtags: Array<Hashtag>,
  id: Scalars['ID'],
  path: Scalars['String'],
  peopleCount: Scalars['Int'],
  points: Scalars['Int'],
  updatedAt?: Maybe<Scalars['String']>,
  user: User,
};

export type Query = {
  __typename?: 'Query',
  group?: Maybe<Group>,
  hashtag?: Maybe<Hashtag>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryGroupArgs = {
  id: Scalars['ID']
};


export type QueryHashtagArgs = {
  hashtagId: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type RallyeRating = Node & {
  __typename?: 'RallyeRating',
  id: Scalars['ID'],
  points: Scalars['Int'],
  rallyeStation: RallyeStation,
};

export type RallyeStation = Node & {
  __typename?: 'RallyeStation',
  id: Scalars['ID'],
  name: Scalars['String'],
  rallyeRatings: Array<RallyeRating>,
};


export type User = Node & {
  __typename?: 'User',
  createdAt?: Maybe<Scalars['String']>,
  gender?: Maybe<GenderEnum>,
  group: Group,
  id: Scalars['ID'],
  info?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  photos?: Maybe<Array<Photo>>,
  picture?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};
export type DashboardQueryVariables = {};


export type DashboardQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { group: (
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name' | 'points' | 'numCatches' | 'numPlaces' | 'numSponsors' | 'numHours'>
      & { level: (
        { __typename?: 'Level' }
        & Pick<Level, 'id' | 'rank' | 'numCatches' | 'numPlaces' | 'numSponsors' | 'numHours'>
        & { requiredHashtags: Maybe<Array<(
          { __typename?: 'Hashtag' }
          & Pick<Hashtag, 'id' | 'name' | 'done'>
        )>> }
      ), photos: Array<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'id' | 'points' | 'path' | 'createdAt'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name' | 'picture'>
        ), hashtags: Array<(
          { __typename?: 'Hashtag' }
          & Pick<Hashtag, 'id' | 'name'>
        )> }
      )> }
    ) }
  )> }
);

export type HashtagInfoQueryVariables = {
  hashtagId: Scalars['ID']
};


export type HashtagInfoQuery = (
  { __typename?: 'Query' }
  & { hashtag: Maybe<(
    { __typename?: 'Hashtag' }
    & Pick<Hashtag, 'id' | 'name' | 'info' | 'description' | 'picture' | 'points' | 'repeatTime' | 'category'>
  )> }
);

export const DashboardDocument = gql`
    query dashboard {
  viewer {
    id
    name
    group {
      id
      name
      points
      numCatches
      numPlaces
      numSponsors
      numHours
      level {
        id
        rank
        requiredHashtags {
          id
          name
          done
        }
        numCatches
        numPlaces
        numSponsors
        numHours
      }
      photos {
        id
        user {
          id
          name
          picture
        }
        hashtags {
          id
          name
        }
        points
        path
        createdAt
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DashboardGQL extends Apollo.Query<DashboardQuery, DashboardQueryVariables> {
    document = DashboardDocument;
    
  }
export const HashtagInfoDocument = gql`
    query HashtagInfo($hashtagId: ID!) {
  hashtag(hashtagId: $hashtagId) {
    id
    name
    info
    description
    picture
    points
    repeatTime
    category
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class HashtagInfoGQL extends Apollo.Query<HashtagInfoQuery, HashtagInfoQueryVariables> {
    document = HashtagInfoDocument;
    
  }