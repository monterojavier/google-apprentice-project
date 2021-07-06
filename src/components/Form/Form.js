import React, { useState } from "react";

import "./Form.css";

function Form(props) {
  const [input, setInput] = useState("");

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
    <form className="shopping-list-form" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Add to list"
        value={input}
        name="text"
        className="shopping-list-input"
        onChange={handleChange}
      />
      <button className="shopping-list-button">Add to List</button>
    </form>
  );
}

export default Form;
