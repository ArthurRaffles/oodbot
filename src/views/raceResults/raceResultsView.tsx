import * as React from "react";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";
import { RaceContext } from "../../contexts";
import { useContext } from "react";
import { Button } from "@material-ui/core";

const createColumns = (onDelete: (entrantId: string) => void): GridColDef[] => {
  console.warn("creatig cols", onDelete);
  return [
   // { field: "id", headerName: "ID", width: 70 },
    { field: "fullname", headerName: "Name", width: 130 },
    { field: "boatClass", headerName: "Boat", width: 130 },
    { field: "py", headerName: "PY", width: 70 },
    {
      field: "finishTime",
      headerName: "Finish Time",
      width: 130,
    },
    {
      field: "correctedSeconds",
      headerName: "Corrected",
      width: 130,
    },
    {
      field: "elapsedSeconds",
      headerName: "Elapsed",
      width: 130,
    },
    {
      field: "id",
      headerName: "delete",
      renderCell: (params: GridCellParams) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
             // console.warn("deleting ", params.value);
              return onDelete(params.value as string);
            }}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];
};

export default function RaceResultsView() {
  const { selectedRace, deleteRacer } = useContext(RaceContext);
  const entrants = selectedRace?.entrants ?? [];
  console.warn("grid entrants", selectedRace);

  const cols = React.useMemo(() => {
    const del = (entrantId: string) =>
      deleteRacer(entrantId, selectedRace?.id ?? "");
    return createColumns(del);
  }, [selectedRace?.id, deleteRacer]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={entrants}
        columns={cols}
        pageSize={30}
        checkboxSelection
      />
    </div>
  );
}
