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
} from "@mui/material";
import { AiOutlineMore } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";

export default function List() {
  const [data, setData] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [showDropDown, setShowDropDown] = useState();

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemId) => {
    // Implement your logic to handle individual item selection here
    console.log(`Selected item with ID: ${itemId}`);
  };

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((items) => {
        setData(items);
      })
      .catch((err) => console.log(err));
  });

  const handleOpenModal = (id) => {
    if (id == showDropDown) {
      setShowDropDown(null);
    } else {
      setShowDropDown(id);
    }
  };

  const Removefunction = (id) => {
    // console.log(id);
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/items/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
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
                          // setSelectedId(item.id);
                          setSelectedData(item);
                        }}
                      >
                        <LuPencil className={styles.pencil} />
                        Edit
                      </button>
                      <br />
                      <button
                        className={styles.button}
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                      >
                        <FiTrash className={styles.delete} />
                        Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
