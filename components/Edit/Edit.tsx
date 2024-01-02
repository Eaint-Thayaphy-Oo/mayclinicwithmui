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

const city = [
  { value: "all", label: "Status All" },
  { value: "yangon", label: "Yangon" },
  { value: "insein", label: "Insein" },
  { value: "tarmwae", label: "Tarmwae" },
];

const township = [
  { value: "all", label: "Status All" },
  { value: "yangon", label: "Yangon" },
  { value: "mandalay", label: "Mandalay" },
  { value: "Shan", label: "Shan" },
];

export default function Edit({ item }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [originalValues, setOriginalValues] = useState({});
  const [editedValues, setEditedValues] = useState({
    id: item.id,
    name: item.name,
    pawrent: item.pawrent,
    gender: item.gender,
    phone: item.phone,
    city: item.city,
    status: item.status,
    breed: item.breed,
    birth: item.birth,
    address: item.address,
    township: item.township,
  });

  useEffect(() => {
    setOriginalValues({
      id: item.id,
      name: item.name,
      pawrent: item.pawrent,
      gender: item.gender,
      phone: item.phone,
      city: item.city,
      status: item.status,
      breed: item.breed,
      birth: item.birth,
      address: item.address,
      township: item.township,
    });
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      gender: e.target.value,
    }));
  };

  const handleBirthChange = (date) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      birth: date,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      id: editedValues.id,
      name: editedValues.name,
      pawrent: editedValues.pawrent,
      gender: editedValues.gender,
      phone: editedValues.phone,
      city: editedValues.city,
      status: editedValues.status,
      breed: editedValues.breed,
      birth: editedValues.birth,
      address: editedValues.address,
      township: editedValues.township,
    };

    fetch("http://localhost:8000/items/" + item.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setOpen(true);
        setModalVisible(false);
        setMessage("Patient is successfully updated!");
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

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <>
      {modalVisible && (
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
                  <div className={styles.inputone}>
                    <label className={styles.label}>Pawrent</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="pawrent"
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={editedValues.pawrent}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={editedValues.gender}
                        onChange={handleGenderChange}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Contact Phone No.</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="phone"
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={editedValues.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>City</label>
                    <TextField
                      id="outlined-select-currency-native"
                      name="city"
                      select
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      helperText=""
                      value={editedValues.city}
                      onChange={handleInputChange}
                    >
                      {city.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                </div>
                <div className={styles.blockthree}>
                  <div className={styles.inputone}>
                    <label className={styles.label}>City</label>
                    <TextField
                      id="outlined-select-currency-native"
                      name="status"
                      select
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      helperText=""
                      value={editedValues.status}
                      onChange={handleInputChange}
                    >
                      {status.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Breed</label>
                    <TextField
                      id="outlined-select-currency-native"
                      name="breed"
                      select
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      helperText=""
                      value={editedValues.breed}
                      onChange={handleInputChange}
                    >
                      {breed.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Date of Birth</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="birth"
                        value={dayjs(editedValues.birth)}
                        onChange={(date) => handleBirthChange(date)}
                        sx={{
                          width: "220px",
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Address</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="address"
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={editedValues.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Township</label>
                    <TextField
                      id="outlined-select-currency-native"
                      name="township"
                      select
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      helperText=""
                      value={editedValues.township}
                      onChange={handleInputChange}
                    >
                      {township.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                </div>
              </div>
              <Stack
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "180px",
                }}
              >
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
                  type="button"
                  variant="outlined"
                  onClick={() => setModalVisible(false)}
                  sx={{
                    color: "#000000",
                    width: "100px",
                    marginLeft: "10px",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </div>
          </div>
        </form>
      )}
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
