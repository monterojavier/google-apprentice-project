import React, { useState } from "react";
import Form from "../Form/Form";
import Item from "../Item/Item";

function List() {
  const [items, setItems] = useState([]);

  const addItems = (item) => {
    if (!item.text || /^\s*$/.test(item.text)) return;

    const newItems = [item, ...items];

    setItems(newItems);
    console.log(...items);
  };

  const removeItem = (id) => {
    const removeArr = [...items].filter((item) => item.id !== id);

    setItems(removeArr);
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
    <div>
      <h1>Shopping List</h1>
      <Form onSubmit={addItems} />
      <Item
        items={items}
        completeItem={completeItem}
        removeItem={removeItem}
        editItem={editItem}
      />
    </div>
  );
}

export default List;
