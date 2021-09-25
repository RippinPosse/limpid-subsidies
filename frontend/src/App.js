import "./App.css";
import Account from "./pages/Account";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Account} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
