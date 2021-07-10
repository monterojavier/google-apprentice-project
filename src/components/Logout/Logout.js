import React from "react";
import GoogleButton from "react-google-button";

import { auth } from "../../firebase";

function Logout() {
  return (
    auth.currentUser && (
      <GoogleButton onClick={() => auth.signOut()} label="Sign out" />
    )
  );
}

export default Logout;
