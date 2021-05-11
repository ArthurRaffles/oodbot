import * as React from "react";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectedRace, deleteRacer } from "../../store/raceState";

const createColumns = (onDelete: (entrantId: string) => void): GridColDef[] => {
  console.warn("creatig cols", onDelete);
  return [
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
  const dispatch = useAppDispatch();
  const race = useAppSelector(selectedRace);
  const entrants = race?.entrants ?? [];
  console.warn("grid entrants", entrants);

  const cols = React.useMemo(() => {
    const del = (entrantId: string) => {
      if (race?.id) {
       dispatch(deleteRacer({entrantId, raceId: race?.id }));
      }
    }
   
    return createColumns(del);
  }, [dispatch, race?.id]);

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
