import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../Nav/nav";
import Footer from "../Footer/Footer";
import {
  getCategories,
  getProductByCategory,
  getProductActive,
  getProductInactive,
} from "../../redux/actions";
import "../ProductSale/ProductSale.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormUpdateProduct from "../FormUpdateProduct/FormUpdateProduct";
import { useState } from "react";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";

export default function ProductSale() {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const productActive = useSelector((state) => state.productActive);
  const productInactive = useSelector((state) => state.productInactive);
  const dispatch = useDispatch();
  const email = window.localStorage.getItem("email");
  const name = productActive && productActive.length > 0 && productActive[0];
  const prodName = Object.keys(name);

  //! productos inactivos
  const [searchValue, setSearchValue] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  let ids = selectedUserIds;

  //? Productos Activos
  const [searchValue1, setSearchValue1] = useState("");
  const [selectedUserIds1, setSelectedUserIds1] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  let ids1 = selectedUserIds1;

  console.log(ids);
  console.log(ids1);

  useEffect(() => {

      


    dispatch(getCategories());
    dispatch(getProductByCategory("Deporte"));
    dispatch(getProductActive(email));
    dispatch(getProductInactive(email));
  }, []);

  let rows = [];
  productInactive.map((prop, index) => {
    rows.push({
      id: index,
      col0: prop.id,
      col1: prop.name,
      col2: prop.stock,
      col3: prop.description,
      col4: prop.price,
      col5: prop.status,
      col6: prop.img,
      col7: prop.salePrice,
      col8: prop.isOnSale,
      col9: prop.deleteLogic,
    });
  });

  const columns = [
    { field: "col0", headerName: "id", width: 150 },
    { field: "col1", headerName: "name", width: 150 },
    { field: "col2", headerName: "stock", width: 150 },
    { field: "col3", headerName: "description", width: 150 },
    { field: "col4", headerName: "price", width: 150 },
    { field: "col5", headerName: "status", width: 150 },
    { field: "col6", headerName: "imagen", width: 150 },
    { field: "col7", headerName: "Oferta", width: 150 },
  ];

  let rows1 = [];
  productActive.map((prop, index) => {
    rows1.push({
      id: index,
      col0: prop.id,
      col1: prop.name,
      col2: prop.stock,
      col3: prop.description,
      col4: prop.price,
      col5: prop.status,
      col6: prop.img,
      col7: prop.salePrice,
      col8: prop.isOnSale,
      col9: prop.deleteLogic,
    });
  });

  const columns1 = [
    { field: "col0", headerName: "id", width: 150 },
    { field: "col1", headerName: "name", width: 150 },
    { field: "col2", headerName: "stock", width: 150 },
    { field: "col3", headerName: "description", width: 150 },
    { field: "col4", headerName: "price", width: 150 },
    { field: "col5", headerName: "status", width: 150 },
    { field: "col6", headerName: "imagen", width: 150 },
    { field: "col7", headerName: "Oferta", width: 150 },
  ];

  let value;

  if (!ids?.length && ids1?.length < 2) {
    value = rows1[ids1];
  } else if (!ids1?.length && ids?.length < 2) {
    value = rows[ids];
  } else {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "No puedes seleccionar mas de 1 productos!",
    });
  }

  console.log(value);

  const filteredRows1 = rows1.filter((row) =>
    row.col1.toLowerCase().includes(searchValue1.toLowerCase())
  );

  const filteredRows = rows.filter((row) =>
    row.col1.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleRowSelection = (selection) => {
    setSelectedUserIds(selection);
  };

  const handleRowSelection1 = (selection) => {
    setSelectedUserIds1(selection);
  };

  return (
    <div className="container-Sale">
      <SearchBar />
      <div className="container-h3">
        <h3>Activos</h3>
      </div>
      <Link to="/">
        <button className="btn btn-outline-success">Hogar</button>
      </Link>
      <div className="Product-active">
        <TextField
          fullWidth
          label="Buscar"
          id="fullWidth"
          value={searchValue1}
          onChange={(event) => setSearchValue1(event.target.value)}
        />
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          checkboxSelection={true}
          onRowSelectionModelChange={(newSelection) =>
            handleRowSelection1(newSelection)
          }
          selectionModel={selectedRows1}
          disableRowSelectionOnClick
          rows={filteredRows1}
          columns={columns1}
        />
      </div>
      <h3>Inactivos</h3>
      <div className="Product-inactive">
        <TextField
          fullWidth
          label="Buscar"
          id="fullWidth"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          checkboxSelection={true}
          onRowSelectionModelChange={(newSelection) =>
            handleRowSelection(newSelection)
          }
          selectionModel={selectedRows}
          disableRowSelectionOnClick
          rows={filteredRows}
          columns={columns}
        />
      </div>
      <FormUpdateProduct value={value} />
      <Footer />
    </div>
  );
}
