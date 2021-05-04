/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRace = /* GraphQL */ `
  mutation CreateRace(
    $input: CreateRaceInput!
    $condition: ModelRaceConditionInput
  ) {
    createRace(input: $input, condition: $condition) {
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
export const updateRace = /* GraphQL */ `
  mutation UpdateRace(
    $input: UpdateRaceInput!
    $condition: ModelRaceConditionInput
  ) {
    updateRace(input: $input, condition: $condition) {
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
export const deleteRace = /* GraphQL */ `
  mutation DeleteRace(
    $input: DeleteRaceInput!
    $condition: ModelRaceConditionInput
  ) {
    deleteRace(input: $input, condition: $condition) {
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
export const createEntrant = /* GraphQL */ `
  mutation CreateEntrant(
    $input: CreateEntrantInput!
    $condition: ModelEntrantConditionInput
  ) {
    createEntrant(input: $input, condition: $condition) {
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
export const updateEntrant = /* GraphQL */ `
  mutation UpdateEntrant(
    $input: UpdateEntrantInput!
    $condition: ModelEntrantConditionInput
  ) {
    updateEntrant(input: $input, condition: $condition) {
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
export const deleteEntrant = /* GraphQL */ `
  mutation DeleteEntrant(
    $input: DeleteEntrantInput!
    $condition: ModelEntrantConditionInput
  ) {
    deleteEntrant(input: $input, condition: $condition) {
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
