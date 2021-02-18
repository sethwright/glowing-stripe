import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/users")
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setLoggedIn(false);
        }
      });
  }, []);

  const showWhichButton = () => {
    if (loggedIn) {
      return (
        <Button color="inherit">
          <Link
            to={"/subscribe"}
            style={{ textDecoration: "none", color: "#FFF" }}
          >
            Subscribe
          </Link>
        </Button>
      );
    } else {
      return (
        <Button color="inherit">
          <Link to={"/login"} style={{ textDecoration: "none", color: "#FFF" }}>
            Login/Sign Up
          </Link>
        </Button>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to={"/"} style={{ textDecoration: "none", color: "#FFF" }}>
            CodeSnippets
          </Link>
        </Typography>
        {showWhichButton()}
      </Toolbar>
    </AppBar>
  );
}
