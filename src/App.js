import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import List from "./components/List/List";
import Login from "./components/Login/Login";

import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/shopping-list">
              <List />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
