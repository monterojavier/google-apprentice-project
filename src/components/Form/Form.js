import React, { useState, useRef, useEffect } from "react";
import { Input, Button } from "@chakra-ui/react";

import "./Form.css";

function Form(props) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus());

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form
      type="submit"
      className="shopping-list-form"
      onSubmit={handleOnSubmit}
    >
      <Input
        type="text"
        placeholder="Add to list"
        value={input}
        name="text"
        className="shopping-list-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <Button
        type="button"
        className="shopping-list-button"
        colorScheme="green"
        onClick={handleOnSubmit}
      >
        Add
      </Button>
    </form>
  );
}

export default Form;
