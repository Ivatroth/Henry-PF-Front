import React from "react";
import DashboardLeft from "../DasboardLeft/DashboardLeft";
import SearchBar from "../Nav/nav";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./UserAdmin.module.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listUsers } from "../../redux/actions";
import axios from "axios";

export default function UserAdmin() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const usersAdmin = useSelector((state) => state.usersAdmin);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const darkModes = useSelector((state) => state.darkModes);
  const dispatch = useDispatch();
  let rows1 = [];
  let ids = selectedUserIds;

  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const handleRowSelection = (selection) => {
    setSelectedUserIds(selection);
  };

  const handleDeleteSelectedUsers = async () => {
    try {
      const response = await axios.delete(
        "https://tuki-server.onrender.com/admin/listusers?action=delete",
        {
          data: { ids: ids },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const handleRestoreSelectedUsers = async () => {
    try {
      const response = await axios.delete(
        "https://tuki-server.onrender.com/admin/listusers?action=restore",
        {
          data: { ids: ids },
        }
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  usersAdmin.map((user, index) => {
    rows1.push({
      id: user.id,
      col1: user.name,
      col2: user.email,
      col3: user.roll,
      col4: user.deleteLogic,
    });
  });

  const filteredRows = rows1.filter((row) =>
    row.col1.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns1 = [
    { field: "col1", headerName: "Nombre", width: 150 },
    { field: "col2", headerName: "Email", width: 150 },
    { field: "col3", headerName: "roll", width: 150 },
    { field: "col4", headerName: "Borrado Lógico", width: 150 },
  ];

  return (
    <div className={darkModes ? styles.allUserAdminDark : styles.allUserAdmin}>
      <SearchBar />
      <DashboardLeft />
      <div className={darkModes ? styles.darkUsers : styles.users}>
        <h1>Usuarios</h1>
        <div className={styles.search}>
          <TextField
            fullWidth
            label="Buscar"
            id="fullWidth"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className={styles.dataGri}>
          <DataGrid
            experimentalFeatures={{ columnGrouping: true }}
            checkboxSelection={true}
            onRowSelectionModelChange={(newSelection) =>
              handleRowSelection(newSelection)
            }
            selectionModel={selectedRows}
            disableRowSelectionOnClick
            rows={filteredRows}
            columns={columns1}
          />
        </div>
        <Button
          onClick={handleDeleteSelectedUsers}
          variant="outlined"
          color="secondary"
        >
          Desactivar
        </Button>
        <Button
          onClick={handleRestoreSelectedUsers}
          variant="outlined"
          color="secondary"
        >
          Activar
        </Button>
      </div>
    </div>
  );
}
