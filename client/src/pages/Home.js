import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import { useState, useEffect } from "react";
import axios from "axios";
import CodeImage from "../assets/code.png";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const [snippets, setSnippets] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axios.get("/snippets").then((res) => {
      setSnippets(res.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              CodeSnippets
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Share your code with everybody!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {snippets.map((snippet) => (
              <Grid item key={snippet.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    src={CodeImage}
                    component="img"
                    title="Check this code out"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {snippet.title}
                    </Typography>
                    <Typography>Take at look at this person's code!</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link to={`/snippet/${snippet.id}`}>View</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
