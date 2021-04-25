
import { DateTime } from 'luxon';

export default function date() {
    return {
        now() {
            return DateTime.now();
        },
        fromISO(iso: string) {
            return DateTime.fromISO(iso);
        },
        diff() {

        },
        

    }
}