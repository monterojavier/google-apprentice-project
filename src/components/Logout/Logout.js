import { Button } from "@chakra-ui/react";
import React from "react";

import { auth } from "../../firebase";

function Logout() {
  return (
    auth.currentUser && (
      <Button onClick={() => auth.signOut()} colorScheme="yellow">
        Sign Out
      </Button>
    )
  );
}

export default Logout;
