import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { useRaceContext } from "../../contexts/raceStateContext";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fullname", headerName: "Name", width: 130 },
  { field: "boatClass", headerName: "Boat", width: 100 },
  { field: "py", headerName: "PY", width: 70 },
  { field: "finishTime", headerName: "Finish Time", width: 130 },
  { field: "correctedSeconds", headerName: "Corrected `Secs", width: 130 },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function RaceResultsView() {
  const { selectedRace } = useRaceContext();
  const entrants = selectedRace?.entrants ?? [];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={entrants}
        columns={columns}
        pageSize={30}
        checkboxSelection
      />
    </div>
  );
}
