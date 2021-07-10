import React, { useState } from "react";
import Form from "../Form/Form";
import { DeleteIcon } from "@chakra-ui/icons";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
} from "@chakra-ui/react";

import "firebase/firestore";
import "firebase/auth";

function Item({ items, removeItem, editItem, editQuantity }) {
  const [edit, setEdit] = useState({
    id: null,
    text: "",
    quantity: "",
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
        {!items
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
        {items &&
          items.map((item, index) => (
            <Tr
              className={item.isComplete ? "item-row complete" : "item-row"}
              key={index}
            >
              <Td key={item.id}>
                <Input
                  type="text"
                  variant="unstyled"
                  defaultValue={item.text}
                  value={item.text}
                  onChange={(event) => {
                    editItem(item.id, event.target.value);
                  }}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  variant="unstyled"
                  defaultValue={item.quantity}
                  value={item.quantity}
                  onChange={(event) => {
                    editQuantity(item.id, event.target.value);
                  }}
                />
              </Td>
              <Td className="icons">
                <DeleteIcon
                  onClick={() => removeItem(item.id, items)}
                  className="delete-item"
                />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}

export default Item;
