"use client";

import React, { useState, useEffect } from "react";
import styles from "./Body.module.css";
import SearchBar from "../Search/SearchBar";
import List from "../List/List";
import Create from "../Create/Create";
import { FaPlus } from "react-icons/fa";
import { TextField, Button } from "@mui/material";

const status = [
  { value: "all", label: "Status All" },
  { value: "allergy", label: "Allergy" },
  { value: "picky", label: "Picky Eater" },
];

const breed = [
  { value: "all", label: "Breed All" },
  { value: "beagle", label: "Beagle" },
  { value: "spaniel", label: "Spaniel" },
  { value: "golden", label: "Golden Retriever" },
];

const rows = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

export default function Body() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [data,setData] = useState(null)
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");
  const [pets, setPets] = useState([]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedItems = filteredItems.slice(startIndex, endIndex);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  const addUserHandler = (user) => {
    const newUsers = [user, ...users];
    setUsers(newUsers);
    setShowForm(!showForm);
  };

  //search
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        setPets(data);
      });
  }, []);

  const handleSearch = (query) => {
    const searchFields = [
      "name",
      "pawrent",
      "gender",
      "birth",
      "phone",
      "address",
      "township",
    ];
    const filtered = items.filter((item) =>
      searchFields.some(
        (field) =>
          item[field] && item[field].toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredItems(filtered);
  };

  //searchbyfilter
  const filteredPets = pets.filter((pet) => {
    return (
      (statusFilter === "all" || pet.status === statusFilter) &&
      (breedFilter === "all" || pet.breed === breedFilter)
    );
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.firstblock}>
            <div>
              <h2 className={styles.header}>Patient List</h2>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.select}>
              <TextField
                id="outlined-select-currency-native"
                select
                label=""
                SelectProps={{
                  native: true,
                  sx: {
                    borderRadius: "20px",
                    height: "30px",
                    width: "90%",
                  },
                }}
                helperText=""
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {status.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency-native"
                select
                label=""
                SelectProps={{
                  native: true,
                  sx: {
                    borderRadius: "20px",
                    height: "30px",
                    width: "70%",
                  },
                }}
                helperText=""
                value={breedFilter}
                onChange={(e) => setBreedFilter(e.target.value)}
              >
                {breed.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
          <div className={styles.secondblock}>
            <Button
              variant="contained"
              sx={{
                marginTop: "50px",
                marginRight: "30px",
                borderRadius: "30px",
                backgroundColor: "#54bab9",
                border: "1px solid #54bab9",
                height: "30px",
              }}
              onClick={showFormHandler}
            >
              <FaPlus className={styles.plus} />
              Add new patient
            </Button>
            <h4 className={styles.p}>
              Rows per page :{" "}
              <TextField
                id="outlined-select-currency-native"
                select
                label=""
                SelectProps={{
                  native: true,
                  sx: {
                    borderRadius: "20px",
                    height: "30px",
                    width: "100%",
                  },
                }}
                helperText=""
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              >
                {rows.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </h4>
          </div>
        </div>
        <List datashow={displayedItems} searchByFilter={filteredPets} />
        {showForm && <Create addUser={addUserHandler} />}
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <span>{`Page ${currentPage}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= filteredItems.length}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}
