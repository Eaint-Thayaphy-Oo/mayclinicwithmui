import React, { useState } from "react";
import styles from "./Create.module.css";
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const statusOptions = [
  { value: "all", label: "please choose status" },
  { value: "allergy", label: "Allergy" },
  { value: "picky", label: "Picky Eater" },
];

const breedOptions = [
  { value: "all", label: "please choose breed" },
  { value: "beagle", label: "Beagle" },
  { value: "spaniel", label: "Spaniel" },
  { value: "golden", label: "Golden Retriever" },
];

const cityOptions = [
  { value: "all", label: "please choose city" },
  { value: "yangon", label: "Yangon" },
  { value: "insein", label: "Insein" },
  { value: "tarmwae", label: "Tarmwae" },
];

const townshipOptions = [
  { value: "all", label: "please choose township" },
  { value: "yangon", label: "Yangon" },
  { value: "mandalay", label: "Mandalay" },
  { value: "Shan", label: "Shan" },
];

export default function Create({ props }) {
  const [name, setName] = useState("");
  const [pawrent, setPawrent] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [township, setTownship] = useState("");
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [message, setMessage] = useState("");

  const handleDateChange = (date) => {
    setBirth(date);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const user = {
      name: name,
      pawrent: pawrent,
      gender: gender,
      phone: phone,
      city: city,
      status: status,
      breed: breed,
      birth: birth,
      address: address,
      township: township,
    };

    fetch("http://localhost:8000/items", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOpen(true);
        setModalVisible(false);
        setMessage("Patient is successfully created!");
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
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Pawrent</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={pawrent}
                      onChange={(event) => setPawrent(event.target.value)}
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
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
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
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>City</label>
                    <TextField
                      name="city"
                      id="outlined-select-currency-native"
                      select
                      defaultValue="EUR"
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      helperText=""
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    >
                      {cityOptions &&
                        cityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </TextField>
                  </div>
                </div>
                <div className={styles.blockthree}>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Status</label>
                    <TextField
                      name="status"
                      id="outlined-select-currency-native"
                      select
                      defaultValue="EUR"
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      helperText=""
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                    >
                      {statusOptions &&
                        statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </TextField>
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Breed</label>
                    <TextField
                      name="breed"
                      id="outlined-select-currency-native"
                      select
                      defaultValue="EUR"
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      placeholder="please choose city"
                      helperText=""
                      value={breed}
                      onChange={(event) => setBreed(event.target.value)}
                    >
                      {breedOptions &&
                        breedOptions.map((option) => (
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
                        value={birth}
                        onChange={handleDateChange}
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
                      InputProps={{
                        style: {
                          borderRadius: "5px",
                          height: "30px",
                          width: "110%",
                          border: "1px solid #54bab9",
                        },
                      }}
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                  <div className={styles.inputone}>
                    <label className={styles.label}>Township</label>
                    <TextField
                      name="township"
                      id="outlined-select-currency-native"
                      select
                      defaultValue="EUR"
                      SelectProps={{
                        native: true,
                        sx: {
                          height: "30px",
                          width: "220px",
                          border: "1px solid #54bab9",
                        },
                      }}
                      placeholder="please choose township"
                      helperText=""
                      value={township}
                      onChange={(event) => setTownship(event.target.value)}
                    >
                      {townshipOptions &&
                        townshipOptions.map((option) => (
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
                    border: "1px solid #54BAB9",
                    backgroundColor: "#54BAB9",
                  }}
                >
                  Save
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
