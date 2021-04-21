import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Grid,
  Avatar,
  Menu,
  MenuItem,
  Paper, Tabs, Tab, Box
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import useStyles from "../styles";
import GroupIcon from "@material-ui/icons/Group";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

import useApplicationData from "../../hooks/useApplicationData";

function Profile(props) {
  const classes = useStyles();
  const { state } = useApplicationData();
  const [value, setValue] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [anchorEl3, setAnchorEl3] = useState(null);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const data = [
    {
      name: "Your Totals",
      Owed: state.profile_info.total_owed,
      Owing: state.profile_info.total_owing,
    },
  ];

  const groups = state.groups.map((group) => {
    const route = `/group/${group.id}`;
    return (
      <MenuItem onClick={handleClose3} component={Link} to={route}>
        {" "}
        {group.name}{" "}
      </MenuItem>
    );
  });

  const billsInDropDown = [];
  const postedBills = state.bills.posted.map((bill) => {
    if (!billsInDropDown.includes(bill.invoice_id)) {
      const route = `/bill/${bill.id}`;
      billsInDropDown.push(bill.invoice_id);
      return (
        <MenuItem onClick={handleClose} component={Link} to={route}>
          {" "}
          {bill.description}{" "}
        </MenuItem>
      );
    }
  });

  const receivedBills = state.bills.received.map((bill) => {
    if (!bill.paid) {
      const route = `/bill/${bill.id}`;
      return (
        <MenuItem onClick={handleClose2} component={Link} to={route}>
          {" "}
          {bill.description}{" "}
        </MenuItem>
      );
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.icon}>
          <AccountBoxIcon />
        </Avatar>
        <Typography className={classes.heading} component="h1" variant="h5">
          Profile
        </Typography>
        <BarChart
          className={classes.barchart}
          width={300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="Owed" fill="#8884d8" />
          <Bar dataKey="Owing" fill="#82ca9d" />
        </BarChart>

        <Grid container alignItems="center" spacing={2} direction="row">

          {/* <Grid container alignItems="center" item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              <FileCopyIcon fontSize="large" /> Bills Created
            </Typography>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <ArrowDropDownIcon fontSize="large" alignItems="center" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {postedBills}
            </Menu>
          </Grid>
          <Grid container alignItems="center" item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              <MonetizationOnIcon fontSize="large" /> Bills To Pay
            </Typography>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick2}
            >
              <ArrowDropDownIcon fontSize="large" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
            >
              {receivedBills}
            </Menu>
          </Grid>

          <Grid container alignItems="flex-end" item xs={12} sm={12}>
            <Typography component="h1" variant="button">
              <GroupIcon fontSize="large" /> Groups
            </Typography>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick3}
            >
              <ArrowDropDownIcon fontSize="large" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl3}
              keepMounted
              open={Boolean(anchorEl3)}
              onClose={handleClose3}
            >
              {groups}
            </Menu>
          </Grid> */}

          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<GroupIcon />} label="Groups" {...a11yProps(0)} />
              <Tab icon={<MonetizationOnIcon />} label="Bills" {...a11yProps(1)}/>
              <Tab icon={<FileCopyIcon />} label="Your Created Bills" {...a11yProps(2)}/>
            </Tabs>
              <TabPanel value={value} index={0}>
              {groups}
              </TabPanel>
              <TabPanel value={value} index={1}>
              {receivedBills}
              </TabPanel>
              <TabPanel value={value} index={2}>
              {postedBills}
              </TabPanel>
          </Paper>
        </Grid>
      </div>
    </Container>
  );
}

export default Profile;


{/* <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PeopleIcon />} label="Groups" />
        <Tab icon={<AccountBalanceWalletIcon />} label="Bills" />
        <Tab icon={<AddToHomeScreenIcon />} label="Your Created Bills" />
      </Tabs>
    </Paper> */}