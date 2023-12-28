import React from "react";
import styles from "./Body.module.css";
import SearchBar from "../Search/SearchBar";
import { FaPlus } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "../List/List";

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
  return (
    <>
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.firstblock}>
            <div>
              <h2 className={styles.header}>Patient List</h2>
              <SearchBar />
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
        <List />
      </div>
    </>
  );
}
