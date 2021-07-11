import "./Form.css";

import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import swal from "sweetalert";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { auth } from "../../firebase";

function Form(props) {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleListChange = (event) => setInput(event.target.value);

  const handleQuantityChange = (event) => setQuantity(event.target.value);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (input === "")
      return swal({
        text: "Opps! Don't forget to label the item!",
        icon: "warning",
        timer: 3000,
      });

    const { uid } = auth.currentUser;

    await props.listRef.add({
      text: input,
      quantity: quantity === "" ? "1" : quantity,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setInput("");
    setQuantity("");
  };

  return (
    <form
      type="submit"
      className="shopping-list-form"
      onSubmit={handleOnSubmit}
    >
      <Input
        type="text"
        placeholder="Item"
        value={input}
        name="text"
        className="shopping-list-input"
        onChange={handleListChange}
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        name="text"
        className="quantity-input"
        onChange={handleQuantityChange}
      />

      <Button
        size="md"
        width="140px"
        type="button"
        className="shopping-list-button"
        colorScheme="green"
        onClick={handleOnSubmit}
      >
        <AddIcon />
      </Button>
    </form>
  );
}

export default Form;
