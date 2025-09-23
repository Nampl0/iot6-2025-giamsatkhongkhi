import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const ActionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "device",
      headerName: "Device",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "createdDate",
      headerName: "Time",
      type: "datetime",
      flex: 1,
    },
  ];
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.post("http://localhost:3000/api/history", {
      page: 1,
      pageSize: 99999,
    });
    setData(res?.data?.data);
  };

  return (
    <Box m="20px">
      <Header title="ACTION HISTORY" />
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

export default ActionHistory;
