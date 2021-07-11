import React, { useState } from "react";
import "./Item.css";
import Form from "../Form/Form";
import { DeleteIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";

import "firebase/firestore";
import "firebase/auth";

const MotionTr = motion(Tr);

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
    <Box className="item-component-box">
      <Table className="item-table" variant="simple" borderRadius="md">
        <Thead>
          <Tr>
            <Th>Items</Th>
            <Th>Quantity</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody className="item-tbody">
          <AnimatePresence>
            {items &&
              items.map((item, index) => (
                <MotionTr
                  variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ ease: "easeIn", delay: 0.25 }}
                  exit={{ opacity: 0 }}
                  className={item.isComplete ? "item-row complete" : "item-row"}
                  key={index}
                >
                  <Td key={item.id}>
                    <Input
                      type="text"
                      variant="unstyled"
                      defaultValue={item.text}
                      value={item.text}
                      onChange={(event) =>
                        editItem(item.id, event.target.value)
                      }
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
                </MotionTr>
              ))}
          </AnimatePresence>
        </Tbody>
      </Table>
    </Box>
  );
}

export default Item;
