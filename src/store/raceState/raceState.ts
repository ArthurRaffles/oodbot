import { actionButton } from "@aws-amplify/ui";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateAdjustedTime, Race, RaceEntrant } from "../../model";
import { raceService } from "../../services";
import type { RootState } from "../../store";

enum Status {
  idle,
  busy,
  error,
}
// Define a type for the slice state
interface RaceState {
  races: Race[];
  selectedRace?: Race;
  status: Status;
}

// Define the initial state using that type
const initialState: RaceState = {
  races: [],
  status: Status.idle,
};
const raceServiceApi = raceService();
export const fetchRaces = createAsyncThunk("raceState/fetchRaces", async () => {
  const response = await raceServiceApi.fetchRaces();
  return response;
});

export const deleteRace = createAsyncThunk(
  "raceState/deleteRace",
  async (race: Race) => {
    console.warn("about to delete race:", race);
    const response = await raceServiceApi.deleteRace(race);
    return response;
  }
);

export const saveRace = createAsyncThunk(
  "raceState/saveRace",
  async (race?: Race) => {
    if (race) {
      console.warn("about to save race:", race);
      const response = await raceServiceApi.saveRace(race);
      return response;
    }

  }
);

type RaceHeader = { name: string; start: string };
type AddEntrant = { entrant: RaceEntrant; raceId?: string };
type DeleteEntrant = { entrantId: string; raceId: string };
export const racesSlice = createSlice({
  name: "raceState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateRaces: (state, action: PayloadAction<Race[]>) => {
      state.races = action.payload;
    },
    setSelected: (state, action: PayloadAction<string>) => {
      const race = state.races.find((race) => race.id === action.payload);

      state.selectedRace = race;
    },
    createRace: (state, action: PayloadAction<RaceHeader>) => {
      const race = Race.create(action.payload.name, action.payload.start);
      state.races = [...state.races, race];
      state.selectedRace = race;
    },
    addRacer: (state, action: PayloadAction<AddEntrant>) => {
      // const race = state.races.find(race => race.id === action.payload.raceId);
      console.warn('adding entrant to state', action.payload);
      const raceIdx = state.races.findIndex(race => race.id === action.payload.raceId);
      if (raceIdx > -1) {
        const theRace = state.races[raceIdx];
        const {entrant} = action.payload;
        const adjustedTime = calculateAdjustedTime(
          theRace.start,
          entrant.finishTime,
          entrant.py
        );
        const updatedEntrant = RaceEntrant.withResult(entrant, adjustedTime);
        state.races[raceIdx].entrants = [
          ...state.races[raceIdx].entrants,
          updatedEntrant
        ];
        state.selectedRace = state.races[raceIdx];
      }

    },
    deleteRacer: (state, action: PayloadAction<DeleteEntrant>) => {
      const raceIdx = state.races.findIndex(race => race.id === action.payload.raceId);
      if (raceIdx > -1) {
        console.warn('deleting entrant', action.payload);
        state.races[raceIdx].entrants = [
          ...state.races[raceIdx].entrants.filter(ent => ent.id !== action.payload.entrantId)
        ]
        state.selectedRace = state.races[raceIdx];
      }
    },
    // deleteRace: (state, action: PayloadAction<string>) => {
    //   console.warn('deleting race', action.payload);
    //   state.races =  state.races.filter(({id}) => id !== action.payload)
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRaces.pending, (state, action) => {
        state.status = Status.busy;
      })
      .addCase(fetchRaces.fulfilled, (state, action) => {
        console.warn("fetched races in thunk", action.payload);
        state.races = action.payload ?? [];
        state.status = Status.idle;
      })
      .addCase(deleteRace.pending, (state, action) => {
        state.status = Status.busy;
      })
      .addCase(deleteRace.fulfilled, (state, action) => {
        console.warn("race deleted fulfilled thunk", action.payload);
        state.status = Status.idle;
      })
      .addCase(deleteRace.rejected, (state, action) => {
        console.warn("race rejected fulfilled thunk", action.error);
        state.status = Status.idle;
      })
      .addCase(saveRace.fulfilled, (state, action) => {
        console.warn("race save fulfilled thunk", action.payload);
        state.status = Status.idle;
      })
      .addCase(saveRace.rejected, (state, action) => {
        console.warn("race save rejected fulfilled thunk", action.error);
        state.status = Status.idle;
      });
  },
});

export const {
  updateRaces,
  setSelected,
  createRace,
  addRacer,
  deleteRacer
} = racesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRaces = (state: RootState): Race[] => state.raceState.races;
export const selectedRace = (state: RootState): Race | undefined =>
  state.raceState.selectedRace;

export const reducer = racesSlice.reducer;
