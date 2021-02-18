import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


export default function Snippets(props) {
  const { id } = props.match.params;

  const [snippet, setSnippet] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`/snippets/${id}`).then((res) => {
      setSnippet(res.data);
      console.log(res.status);
    }).catch((err) => {
        // err.response.status for status code -> 403
        if (err.response.status === 403) {
            setRedirect(true);
        }
    });
  }, []);

  return (
    <div>
      <h1>{snippet.title}</h1>
      <p>{snippet.snippet}</p>
      {redirect && <Redirect to="/subscribe"/>}
    </div>
  );
}
