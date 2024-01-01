import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import dayjs from "dayjs";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Edit({ item }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [originalValues, setOriginalValues] = useState({});
  const [editedValues, setEditedValues] = useState({
    id: item.id,
    name: item.name,
  });

  useEffect(() => {
    setOriginalValues({
      id: item.id,
      name: item.name,
    });
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!editedValues.name) {
      alert("Please fill in all the required fields");
      return;
    }

    const hasChanges = Object.keys(originalValues).some(
      (key) => originalValues[key] !== editedValues[key]
    );

    if (!hasChanges) {
      alert("No changes made. Update a field to save changes.");
      window.location.reload();
      return;
    }

    const data = {
      id: editedValues.id,
      name: editedValues.name,
    };

    fetch("http://localhost:8000/items/" + item.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setOpen(true);
        window.location.reload();
        setMessage("Saved successfully.");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleClick = () => {
    setOpen(true);
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

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.modalblock}>
        <div className="">
          <h1 className={styles.text}>Add new patient</h1>
          <h2 className={styles.textone}>
            Enter new patient information below
          </h2>
          <div className={styles.blockone}>
            <div className={styles.blocktwo}>
              <div className={styles.inputone}>
                <label className={styles.label}>Pet Name</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="name"
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      height: "30px",
                      width: "110%",
                      border: "1px solid #54bab9",
                    },
                  }}
                  value={editedValues.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <Stack sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleClick}
              sx={{
                width: "100px",
                border: "1px solid #EDC339",
                backgroundColor: "#EDC339",
              }}
            >
              Update
            </Button>
            <Button
              type="submit"
              variant="outlined"
              onClick={handleClick}
              sx={{
                color: "#000000",
                width: "100px",
              }}
            >
              Cancel
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Patient is successfully updated!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </div>
    </form>
  );
}
