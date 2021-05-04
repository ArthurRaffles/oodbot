/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRace = /* GraphQL */ `
  subscription OnCreateRace {
    onCreateRace {
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
export const onUpdateRace = /* GraphQL */ `
  subscription OnUpdateRace {
    onUpdateRace {
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
export const onDeleteRace = /* GraphQL */ `
  subscription OnDeleteRace {
    onDeleteRace {
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
export const onCreateEntrant = /* GraphQL */ `
  subscription OnCreateEntrant {
    onCreateEntrant {
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
export const onUpdateEntrant = /* GraphQL */ `
  subscription OnUpdateEntrant {
    onUpdateEntrant {
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
export const onDeleteEntrant = /* GraphQL */ `
  subscription OnDeleteEntrant {
    onDeleteEntrant {
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
