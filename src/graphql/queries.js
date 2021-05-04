/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRace = /* GraphQL */ `
  query GetRace($id: ID!) {
    getRace(id: $id) {
      id
      name
      start
      seriesId
      entrants {
        items {
          id
          raceID
          fullname
          boatClass
          py
          finishTime
          elapsedSeconds
          correctedSeconds
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRaces = /* GraphQL */ `
  query ListRaces(
    $filter: ModelRaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        start
        seriesId
        entrants {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEntrant = /* GraphQL */ `
  query GetEntrant($id: ID!) {
    getEntrant(id: $id) {
      id
      raceID
      fullname
      boatClass
      py
      finishTime
      elapsedSeconds
      correctedSeconds
      createdAt
      updatedAt
    }
  }
`;
export const listEntrants = /* GraphQL */ `
  query ListEntrants(
    $filter: ModelEntrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        raceID
        fullname
        boatClass
        py
        finishTime
        elapsedSeconds
        correctedSeconds
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
