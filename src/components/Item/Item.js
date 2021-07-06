import React, { useState } from "react";
import Form from "../Form/Form";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function Item({ items, completeItem, removeItem, editItem }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    editItem(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <Form edit={edit} onSubmit={submitUpdate} />;
  }

  return items.map((item, index) => (
    <div
      className={item.isComplete ? "item-row complete" : "item-row"}
      key={index}
    >
      <div key={item.id} onClick={() => completeItem(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        <DeleteIcon
          onClick={() => removeItem(item.id)}
          className="delete-item"
        />
        <EditIcon
          onClick={() => setEdit({ id: item.id, value: item.text })}
          className="edit-item"
        />
      </div>
    </div>
  ));
}

export default Item;
