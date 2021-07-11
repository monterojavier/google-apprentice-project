import "./App.css";

import { ChakraProvider, Box, Button, VStack } from "@chakra-ui/react";
import List from "./components/List/List";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login/Login";

import { firestore } from "./firebase";
import swal from "sweetalert";

import { WarningIcon } from "@chakra-ui/icons";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  const removeAll = async (_, count = 0) => {
    let alertVal =
      count > 0
        ? null
        : await swal(
            "Are you sure?",
            "You are about to delete this awesome list...",
            {
              dangerMode: true,
              buttons: ["Nevermind", "Yes"],
            }
          );

    if (!alertVal) return;

    const listRef = firestore.collection(`Users/${user.uid}/List`);
    const queryList = listRef.orderBy("createdAt").limit(30);

    const snapshot = await queryList.get();
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      return;
    }

    // Delete documents in a batch
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    //exploding the stack.
    process.nextTick(() => {
      removeAll(_, ++count);
    });
  };

  return (
    <ChakraProvider>
      <Box className="App">
        {user ? (
          <div>
            <Box className="columns">
              <Box className="app-box sub-column-1"></Box>
              <Box grow="" className="app-list sub-column-2">
                <List user={user} />
              </Box>
              <Box className="app-logout sub-column-3">
                <VStack spacing="24px">
                  <Logout />
                  <Button
                    colorScheme="red"
                    rightIcon={<WarningIcon />}
                    onClick={removeAll}
                  >
                    Clear List
                  </Button>
                </VStack>
              </Box>
            </Box>
          </div>
        ) : (
          <Login />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
