export type RaceDto = {
    id: string;
    start: string;
    name: string;
    seriesId?: string;
    createdAt?: string;
    updatedAt?: string;
    entrants: {
      items: RaceEntrantDto[];
    };
  }

  export type RaceEntrantDto = {
    id: string;
    fullname: string;
    boatClass: string;
    py: number;
    finishTime: string;
    elapsedSeconds?: number;
    correctedSeconds?: number;
    createdAt?: string;
    updatedAt?: string;
  }