import { DateTime, Interval } from "luxon";

export type AdjustedResult = {
    elapsedSeconds: number;
    correctedSeconds: number;
}

export const calculateAdjustedTime = (
  startDate: string,
  finishTime: string,
  pyNumber: number
): AdjustedResult => {
  const [hour, minute, second] = finishTime.split(":");
  const start = DateTime.fromISO(startDate);

  const end = DateTime.fromISO(startDate).set({
    hour: Number(hour),
    second: Number(second),
    minute: Number(minute),
  });
  const interval = Interval.fromDateTimes(start, end);
  const elapsedSeconds = interval.length('second');
 
  const correctedSeconds = (elapsedSeconds / pyNumber) * 1000;
  console.warn("Adjusted time", {
    elapsedSeconds,
    correctedSeconds
  });

  return {
    elapsedSeconds,
    correctedSeconds
  };
};
