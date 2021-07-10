import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import List from "./components/List/List";
import Login from "./components/Login/Login";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <ChakraProvider>
      <div className="App">{user ? <List /> : <Login />}</div>
    </ChakraProvider>
  );
}

export default App;
