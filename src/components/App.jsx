import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateGroup from "./CreateGroup";
import AddBill from "./AddBill";
import Friends from "./Friends";
import Profile from "./Profile";
import Bill from "./Bill";
import EditBill from "./EditBill";
import Group from "./Group";

function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/addbill" component={AddBill} />
          <Route path="/profile" component={Profile} />
          <Route path="/creategroup" component={CreateGroup} />
          <Route path="/friends" component={Friends} />
          <Route path="/bill/:id" component={Bill} />
          <Route path="/editBill/:id" component={EditBill} />
          <Route path="/group/:id" component={Group} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

// endIcon={<Icon>send</Icon>}
//for later, if we want to add icons inside the buttons, or just use images maybe
