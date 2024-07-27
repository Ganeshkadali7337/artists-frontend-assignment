import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Transactions from "./Transactions";

import AddTransaction from "./AddTransaction";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Transactions} />
        <Route exact path="/add-transaction" component={AddTransaction} />
      </Switch>
    </Router>
  );
}

export default App;
