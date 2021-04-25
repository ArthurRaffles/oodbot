import { DateTime } from 'luxon';

export type Race = {
    id: string;
    start: DateTime;
    name: string;
    seriesId?: string;
}