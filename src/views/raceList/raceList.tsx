import * as React from "react";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";
import { RaceContext } from "../../contexts";
import { useContext } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";

const createColumns = (onDelete: (raceId: string) => void): GridColDef[] => {
  console.warn("creating race list cols", onDelete);
  return [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      renderCell: (params: GridCellParams) => (
        <strong>
          <RouterLink to={`/createRace?id=${params.id}`}>
            {params.value}
          </RouterLink>
        </strong>
      ),
    },
    {
      field: "start",
      headerName: "Start Time",
      width: 150,
    },
    { field: "series", headerName: "Series", width: 150 },
    {
      field: "id",
      headerName: "actions",
      renderCell: (params: GridCellParams) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
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
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 500,
  },
}));

export const RaceList = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { deleteRace, races, fetchRaces } = useContext(RaceContext);
  fetchRaces();
  console.warn("races", races);

  const cols = React.useMemo(() => {
    const del = (raceId: string) => deleteRace(raceId);
    return createColumns(del);
  }, [deleteRace]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={races}
              columns={cols}
              pageSize={30}
              //   onRowSelected={(params) => {
              //     console.warn("click", params.data);
              //     useRouteMatch("/races");
              //   }}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
