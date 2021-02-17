import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Settings from "pages/Settings";
import Subscribe from "pages/Subscribe";
import Snippet from "pages/Snippet";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/snippet">
          <Snippet />
        </Route>
        <Route path="/subscribe">
          <Subscribe />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
