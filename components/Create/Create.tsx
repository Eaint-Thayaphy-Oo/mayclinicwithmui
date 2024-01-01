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

export default function Create({props}) {
  // console.log("create form", props);
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
  const [message, setMessage] = useState("");

  // const handleCancel = () => {
  //   setOpen(false);
  // };

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
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="please choose city"
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      height: "30px",
                      width: "110%",
                      border: "1px solid #54bab9",
                    },
                  }}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
                <img
                  src="/images/black_down.png"
                  alt="logo"
                  width={10}
                  height={10}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.blockthree}>
              <div className={styles.inputone}>
                <label className={styles.label}>Status</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="please choose status"
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      height: "30px",
                      width: "110%",
                      border: "1px solid #54bab9",
                    },
                  }}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                />
                <img
                  src="/images/black_down.png"
                  alt="logo"
                  width={10}
                  height={10}
                  className={styles.imageone}
                />
              </div>
              <div className={styles.inputone}>
                <label className={styles.label}>Breed</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="please choose breed"
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      height: "30px",
                      width: "110%",
                      border: "1px solid #54bab9",
                    },
                  }}
                  value={breed}
                  onChange={(event) => setBreed(event.target.value)}
                />
                <img
                  src="/images/black_down.png"
                  alt="logo"
                  width={10}
                  height={10}
                  className={styles.imagetwo}
                />
              </div>
              <div className={styles.inputone}>
                <label className={styles.label}>City</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={birth} onChange={handleDateChange} />
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
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="please choose township"
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      height: "30px",
                      width: "110%",
                      border: "1px solid #54bab9",
                    },
                  }}
                  value={township}
                  onChange={(event) => setTownship(event.target.value)}
                />
                <img
                  src="/images/black_down.png"
                  alt="logo"
                  width={10}
                  height={10}
                  className={styles.imagethree}
                />
              </div>
            </div>
          </div>

          <Stack spacing={2} sx={{ width: "100%", marginLeft: "170px" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleClick}
              sx={{
                width: "100px",
                border: "1px solid #54bab9",
                backgroundColor: "#54bab9",
              }}
            >
              Save
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Patient is successfully created!
              </Alert>
            </Snackbar>
          </Stack>
          <Button
            variant="outlined"
            sx={{ color: "#000000", marginLeft: "280px" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
