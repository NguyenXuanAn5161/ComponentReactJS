import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <Switch>
          <Route path="/news">news</Route>
          <Route path="/about">about</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">404 not found</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;