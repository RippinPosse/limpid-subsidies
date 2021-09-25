import React, { useEffect, useState } from "react";
import Navigation from "../components/Nav";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import { COLORS } from "../colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  wrapper: {
    paddingTop: "10%",
  },
  header: {
    color: COLORS.textPrimary,
  },
  cardsContainer: {
    margin: "50px auto",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    width: "230px",
    height: "230px",
    backgroundColor: COLORS.light,
    borderRadius: 25,
  },
});

const cards = [
  {
    caption: "Заявка №11111",
    link: "/application/11111",
  },
  {
    caption: "Заявка №11112",
    link: "/application/11112",
  },
];

const Account = () => {
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/applications/my");
  });

  return (
    <Container component="main" maxWidth="xs">
      <Navigation
        navLinks={[{ link: "/", title: "Личный кабинет" }]}
      ></Navigation>

      <Container
        minWidth="xs"
        component="main"
        className={classes.cardsContainer}
      >
        <Grid container spacing={3} justify="center">
          {cards.map((card) => (
            <Link to={card.link} style={{ textDecoration: "none" }}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography variant="h5">{card.caption}</Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Account;
