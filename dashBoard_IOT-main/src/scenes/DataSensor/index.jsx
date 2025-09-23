import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataSensor } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const DataSensor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "temperature",
      headerName: "Temperature",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "humidity",
      headerName: "Humidity",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "light",
      headerName: "Light",
      flex: 1,
    },
    // {
    //   field: "wind",
    //   headerName: "Wind",
    //   flex: 1,
    // },
    {
      field: "createdDate",
      headerName: "Ngày tạo",
      flex: 1,
    },
  ];
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    getDataSensor();
  }, []);

  const getDataSensor = async () => {
    const res = await axios.post("http://localhost:3000/api/dataSensor", {
      page: 1,
      pageSize: 99999,
    });
    setData(res?.data?.data);
  };

  return (
    <Box m="20px">
      <Header title="DATA SENSOR" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[7, 20, 50]}
          pagination
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DataSensor;
