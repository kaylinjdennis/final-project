import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  Typography,
  Container,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Button,
} from "@material-ui/core";
import useStyles from "../styles";
import ReceiptIcon from "@material-ui/icons/Receipt";
import useApplicationData from "../../hooks/useApplicationData";

const data = [
  { name: "Paid", value: 4 },
  { name: "Unpaid", value: 3 },
];

function Bill(props) {
  const billID = props.match.params.id;
  const { state, payBill, deleteBill } = useApplicationData();
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const receivedBill = state.bills.received.filter(
    (bill) => bill.id === Number(billID)
  );
  const postedBill = state.bills.posted.filter(
    (bill) => bill.id === Number(billID)
  );

  let bill = [];
  if (receivedBill.length !== 0) {
    bill = receivedBill;
  } else if (postedBill.length !== 0) {
    bill = postedBill;
  }

  let group = [];
  let billCreator = [];
  if (bill.length !== 0 && bill[0].poster_id) {
    group = state.groups.filter((group) => group.id === bill[0].group_id);
    billCreator = state.friends.filter(
      (friend) => friend.friend_info.id === bill[0].poster_id
    );
  }

  let groupMembers = [];
  const paidMembers = [];
  const owingMembers = [];
  let paidMembersMapped = [];
  let owingMembersMapped = [];

  if (bill.length !== 0 && bill[0].payee_id) {
    group = state.groups.filter((group) => group.id === bill[0].group_id);
    const bills = state.bills.posted.filter(
      (eachBill) => eachBill.invoice_id === bill[0].invoice_id
    );
    for (const bill of bills) {
      groupMembers.push(bill.payee_id);
      if (bill.paid) {
        paidMembers.push(bill.payee_id);
      } else {
        owingMembers.push(bill.payee_id);
      }
    }
    paidMembersMapped = paidMembers.map((member) => {
      const memberArr = state.friends.filter(
        (friend) => friend.friend_info.id === member
      );
      console.log("memberObj", memberArr);
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar
              className={classes.friends}
              src={memberArr[0].friend_info.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={memberArr[0].friend_info.name}
            secondary={secondary ? "Secondary text" : null}
          />
        </ListItem>
      );
    });
    owingMembersMapped = owingMembers.map((member) => {
      const memberArr = state.friends.filter(
        (friend) => friend.friend_info.id === member
      );
      console.log("memberObj", memberArr);
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar
              className={classes.friends}
              src={memberArr[0].friend_info.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={memberArr[0].friend_info.name}
            secondary={secondary ? "Secondary text" : null}
          />
        </ListItem>
      );
    });
  }

  data.pop();
  data.pop();
  data.push({ name: "Paid", value: paidMembers.length });
  data.push({ name: "Unpaid", value: owingMembers.length });

  const COLORS = ["#0088FE", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`$${percent * groupMembers.length * bill[0].cost}`}
      </text>
    );
  };

  return (
    <>
      {bill.length === 0 && <Typography variant="h5">Loading</Typography>}
      {bill.length !== 0 && bill[0].poster_id && (
        <>
          {bill[0].poster_id &&
            bill.length !== 0 &&
            group.length !== 0 &&
            billCreator.length !== 0 && (
              <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                  <Avatar className={classes.icon}>
                    <ReceiptIcon />
                  </Avatar>
                  <Typography
                    className={classes.heading}
                    component="h1"
                    variant="h5"
                  >
                    Bill
                  </Typography>
                  <Grid
                    container
                    alignItems="center"
                    spacing={2}
                    direction="row"
                  >
                    <Grid container alignItems="center" item xs={12} sm={12}>
                      <Typography
                        component="h1"
                        variant="button"
                        style={{ marginRight: 16 }}
                      >
                        Description:
                      </Typography>
                      <Typography
                        component="h1"
                        variant="subtitle1"
                        color="primary"
                      >
                        {bill[0].description}
                      </Typography>
                    </Grid>
                    <Grid container alignItems="center" item xs={12} sm={12}>
                      <Typography
                        component="h1"
                        variant="button"
                        style={{ marginRight: 16 }}
                      >
                        Created By:
                      </Typography>
                      <Typography
                        component="h1"
                        variant="subtitle1"
                        color="primary"
                      >
                        {billCreator[0].friend_info.name}
                      </Typography>
                    </Grid>
                    <Grid container alignItems="center" item xs={12} sm={12}>
                      <Typography
                        component="h1"
                        variant="button"
                        style={{ marginRight: 16 }}
                      >
                        Group Name:
                      </Typography>
                      <Typography
                        component="h1"
                        variant="subtitle1"
                        color="primary"
                      >
                        {group[0].name}
                      </Typography>
                    </Grid>
                    <Grid container alignItems="center" item xs={12} sm={12}>
                      <Typography
                        component="h1"
                        variant="button"
                        style={{ marginRight: 16 }}
                      >
                        $ Due:
                      </Typography>
                      <Typography
                        component="h1"
                        variant="subtitle1"
                        color="primary"
                      >
                        ${bill[0].cost}
                      </Typography>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => {
                        payBill(billID);
                      }}
                      href={"/profile"}
                    >
                      Pay Bill
                    </Button>
                  </Grid>
                </div>
              </Container>
            )}
        </>
      )}
      {bill.length !== 0 && bill[0].payee_id && (
        <>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.icon}>
                <ReceiptIcon />
              </Avatar>
              <Typography
                className={classes.heading}
                component="h1"
                variant="h5"
              >
                Bill
              </Typography>
              <Grid container alignItems="center" spacing={2} direction="row">
                <Grid container alignItems="center" item xs={12} sm={12}>
                  <Typography
                    component="h1"
                    variant="button"
                    style={{ marginRight: 16 }}
                  >
                    Group:
                  </Typography>
                  <Typography
                    component="h1"
                    variant="subtitle1"
                    color="primary"
                  >
                    {group[0].name}
                  </Typography>
                </Grid>
                <Grid container alignItems="center" item xs={12} sm={12}>
                  <Typography
                    component="h1"
                    variant="button"
                    style={{ marginRight: 16 }}
                  >
                    Description:
                  </Typography>
                  <Typography
                    component="h1"
                    variant="subtitle1"
                    color="primary"
                  >
                    {bill[0].description}
                  </Typography>
                </Grid>
                <Grid container alignItems="center" item xs={12} sm={12}>
                  <Typography
                    component="h1"
                    variant="button"
                    style={{ marginRight: 16 }}
                  >
                    Total:
                  </Typography>
                  <Typography
                    component="h1"
                    variant="subtitle1"
                    color="primary"
                  >
                    ${bill[0].cost * groupMembers.length}
                  </Typography>
                </Grid>
                <PieChart width={400} height={240} alignItems="flex-start">
                  <Pie
                    label={renderLabel}
                    isAnimationActive={false}
                    data={data}
                    cx={175}
                    cy={120}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    interval={0}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <Grid container spacing={1} direction="row">
                  <Grid item xs={6} md={6} className={classes.billFriends}>
                    <Box bgcolor="#0088FE">
                      <Typography variant="button" style={{ marginLeft: 10 }}>
                        Have Paid:
                      </Typography>
                      <div className={classes.demo}>
                        <List dense={dense}>{paidMembersMapped}</List>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={6} className={classes.billFriends}>
                    <Box bgcolor="#00C49F">
                      <Typography variant="button" style={{ marginLeft: 10 }}>
                        Have Not Paid:
                      </Typography>
                      <div className={classes.demo}>
                        <List dense={dense}>{owingMembersMapped}</List>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1} direction="row">
                <Grid item xs={6} md={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={`/editBill/${bill[0].id}`}
                  >
                    Edit Bill
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      deleteBill(bill[0].id);
                    }}
                    href={"/profile"}
                  >
                    Delete Bill
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default Bill;
