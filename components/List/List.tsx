"use client";

import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";
import { AiOutlineMore } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import Edit from "../../components/Edit/Edit";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface DataType {
  id: number;
  name: string;
  status: string;
  pawrent: string;
  breed: string;
  gender: string;
  birth: number;
  phone: number;
  address: string;
  township?: string;
  city?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function List() {
  const [data, setData] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState<DataType>();
  const [showDropDown, setShowDropDown] = useState();
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [message, setMessage] = useState("");

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemId) => {
    console.log(`Selected item with ID: ${itemId}`);
  };

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((items) => {
        setData(items);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleOpenModal = (id) => {
    if (id == showDropDown) {
      setShowDropDown(null);
    } else {
      setShowDropDown(id);
    }
  };

  const Removefunction = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      fetch("http://localhost:8000/items/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          setOpen(true);
          setModalVisible(false);
          setMessage("Patient is successfully deleted!");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  inputProps={{ "aria-label": "Select All" }}
                />
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Pawrent
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Breed
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Gender
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Date of Birth
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Contact Phone No.
              </TableCell>
              <TableCell
                sx={{
                  fontStyle: "Poppins",
                  fontSize: "14px",
                  fontWeight: "semibold",
                  color: "#54bab9",
                }}
              >
                Address
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectAll}
                      onChange={() => handleSelectItem(item.id)}
                      inputProps={{ "aria-label": `Select Item ${item.id}` }}
                    />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.pawrent}</TableCell>
                  <TableCell>{item.breed}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.birth}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {item.address},{item.city},{item.township}.
                  </TableCell>
                  <TableCell
                    className={styles.modalId}
                    onClick={() => handleOpenModal(item?.id)}
                  >
                    <AiOutlineMore />
                    {showDropDown === item?.id && (
                      <div className={styles.modal}>
                        <button
                          className={styles.button}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditModal(true);
                            setSelectedData(item);
                          }}
                        >
                          <LuPencil className={styles.pencil} />
                          Edit
                        </button>
                        <br />
                        <Stack>
                          <button
                            className={styles.button}
                            onClick={() => {
                              Removefunction(item.id);
                            }}
                          >
                            <FiTrash className={styles.delete} />
                            Delete
                          </button>
                        </Stack>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editModal == true ? <Edit item={selectedData} /> : null}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
