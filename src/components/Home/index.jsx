import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline, Grid, Button } from "@material-ui/core";
import useStyles from "../styles";

function Home() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="space-around"
        style={{ minHeight: "90vh" }}
      >
        <Grid item xs={6}>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Profile
            </Button>
          </Link>
          <Link to="/addbill" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              New Bill
            </Button>
          </Link>
          <Link to="/creategroup" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create Group
            </Button>
          </Link>
          <Link to="/friends" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add Friends
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;

// endIcon={<Icon>send</Icon>}
//for later, if we want to add icons inside the buttons, or just use images maybe
