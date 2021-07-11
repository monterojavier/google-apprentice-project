import React from "react";
import GoogleButton from "react-google-button";

import firebase from "firebase/app";
import { auth } from "../../firebase";

function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    auth.signInWithPopup(provider);
  };

  return (
    <GoogleButton
      onClick={signInWithGoogle}
      type="dark"
      label="Log in with Google"
    />
  );
}

export default Login;
