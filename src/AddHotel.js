import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LoaderFun from "./Loader";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  paper: {
    width: "100%",
    padding: "5%",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AddHotel(props) {
  const classes = useStyles();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [location, setLocation] = useState("");
  const [noOfPeople, setNoOfPeople] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  function checkInChangeHandler(event) {
    setCheckInDate(event.target.value);
  }

  function checkOutChangeHandler(event) {
    setCheckOutDate(event.target.value);
  }

  function changeLocationHandler(event) {
    setLocation(event.target.value);
  }

  function changeNoOfPeopleHandler(event) {
    setNoOfPeople(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    setShowLoader(true);
    const payload = {
      checkinDate: checkInDate,
      checkoutDate: checkOutDate,
      location,
      noOfPeople,
    };

    const url = "https://reqbin.com/echo/post/json";

    const response = axios
      .post(url, payload)
      .then((res) => {
        setShowLoader(false);
        console.log(res);
      })
      .catch((err) => {
        setShowLoader(false);
        console.log(err);
      });
  }

  return (
    <Container maxWidth="sm">
      {showLoader ? <LoaderFun showLoader={showLoader} /> : <></>}
      <Paper className={classes.paper} elevation={3}>
        <h3>Add Hotel</h3>
        <form className={classes.root} onSubmit={submitHandler}>
          <TextField
            id="checkInDate"
            label="Check In Date"
            type="date"
            className={classes.textField}
            onChange={checkInChangeHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="checkOutDate"
            label="Check Out Date"
            type="date"
            className={classes.textField}
            onChange={checkOutChangeHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            onChange={changeLocationHandler}
          />
          <TextField
            id="outlined-basic"
            label="No Of People"
            variant="outlined"
            onChange={changeNoOfPeopleHandler}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
