import React from "react";
import TextField from "@mui/material/TextField";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Search table"
        InputProps={{
          style: {
            borderRadius: "30px",
            height: "30px",
            width:"110%",
            border: "1px solid rgba(68, 68, 68, 0.5)",
          },
        }}
      />
      <CiSearch className={styles.icon}/>
    </div>
  );
}
