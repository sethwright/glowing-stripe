import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { CopyBlock, dracula } from "react-code-blocks";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

export default function Snippets(props) {
  const { id } = props.match.params;

  const [snippet, setSnippet] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`/snippets/${id}`)
      .then((res) => {
        setSnippet(res.data);
      })
      .catch((err) => {
        // err.response.status for status code -> 403
        if (err.response.status === 403) {
          setRedirect(true);
        } else {
          console.log(err);
        }
      });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h2" align="center">
        {snippet.title}
      </Typography>
      <CopyBlock
        text={snippet.snippet || ""}
        theme={dracula}
        language={snippet.language || "text"}
      />
      {redirect && <Redirect to="/subscribe" />}
    </Container>
  );
}
