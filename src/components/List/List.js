import React, { useState } from "react";
import Form from "../Form/Form";
import Item from "../Item/Item";
import { Button, Container } from "@chakra-ui/react";

import "./List.css";

function List() {
  const [items, setItems] = useState([]);

  const addItems = (item) => {
    if (!item.text || /^\s*$/.test(item.text)) return;

    const newItems = [item, ...items];

    setItems(newItems);
    console.log(item, ...items);
  };

  const removeItem = (id) => {
    const removeArr = [...items].filter((item) => item.id !== id);

    setItems(removeArr);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (itemId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) return;

    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  const completeItem = (id) => {
    let updatedItems = items.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <Container id="list">
      <h1>Shopping List</h1>

      <Container className="shopping-list-form">
        <Form onSubmit={addItems} />
        <Button colorScheme="red" onClick={removeAll}>
          Clear
        </Button>
      </Container>
      <Item
        items={items}
        completeItem={completeItem}
        removeItem={removeItem}
        editItem={editItem}
      />
    </Container>
  );
}

export default List;
