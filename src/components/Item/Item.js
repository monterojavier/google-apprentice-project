import React, { useState } from "react";
import Form from "../Form/Form";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

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

  return (
    <Table>
      <TableCaption>
        {items.length === 0
          ? "Lets add something to the list!"
          : items.length === 1
          ? "Just one thing?"
          : "Yass! Much better! "}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Items</Th>
          <Th>Quantity</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item, index) => (
          <Tr
            className={item.isComplete ? "item-row complete" : "item-row"}
            key={index}
          >
            <Td key={item.id} onClick={() => completeItem(item.id)}>
              {item.text}
            </Td>
            <Td></Td> {/* This will be the quanity logic  */}
            <Td className="icons">
              <DeleteIcon
                onClick={() => removeItem(item.id)}
                className="delete-item"
              />
              <EditIcon
                onClick={() => setEdit({ id: item.id, value: item.text })}
                className="edit-item"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Items</Th>
          <Th>Quantity</Th>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}

export default Item;
