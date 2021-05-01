import { DateTime } from 'luxon';
import { createId } from '../utils';
import { RaceEntrant } from './raceEntrant';

export type Race = {
    id: string;
    start?: string;
    name: string;
    seriesId?: string;
    entrants: RaceEntrant[];
}

export namespace Race {
    export const create = (name: string, start: string) => {
        return {
            id: createId(),
            start,
            name,
            entrants: []
        };
    }
}