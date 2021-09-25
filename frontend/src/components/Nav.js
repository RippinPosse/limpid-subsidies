import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { COLORS } from "../colors";

const useStyles = makeStyles({
  linkPrimary: {
    color: COLORS.dark,
    opacity: 0.8,
    fontSize: "25pt",
    textDecoration: "none",
    margin: "0 12px",
  },
  linkSecondary: {
    color: COLORS.dark,
    opacity: 0.5,
    fontSize: "15pt",
    textDecoration: "none",
  },
});

const Navigation = (props) => {
  const classes = useStyles();
  const { navLinks } = props;

  return (
    <Container>
      <Grid container direction="row" justify="center" alignItems="flex-end">
        <Link to={navLinks[0].link} className={classes.linkSecondary}>
          {navLinks[0].title}
        </Link>
      </Grid>
    </Container>
  );
};

export default Navigation;
