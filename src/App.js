import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import List from "./components/List/List";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <List />
      </div>
    </ChakraProvider>
  );
}

export default App;
