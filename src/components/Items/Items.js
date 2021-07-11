import React, { useState } from "react";
import "./Items.css";
import Form from "../Form/Form";
import { DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Color from "color";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

import "firebase/firestore";
import "firebase/auth";

const MotionTr = motion(Tr);
const MotionInput = motion(Input);
const MotionTBody = motion(Tbody);

const colorStart = Color("#fff4ba");
const colorEnd = Color("#fcd817");

function Items({ items, removeItem, editItem, editQuantity }) {
  const [edit, setEdit] = useState({
    id: null,
    text: "",
    quantity: "",
  });

  const [isSorted, setIsSorted] = useState(false);

  const handleSort = () => setIsSorted(!isSorted);
  const sorter = (a, b) => {
    if (isSorted) {
      const textA = a.text.toUpperCase();
      const textB = b.text.toUpperCase();

      let comparison = 0;

      if (textA > textB) comparison = 1;
      else if (textA < textB) comparison = -1;

      return comparison;
    } else {
      const createdAtA = a.createdAt === null ? 0 : a.createdAt.seconds;
      const createdAtB = b.createdAt === null ? 0 : b.createdAt.seconds;

      let comparison = 0;

      if (createdAtA > createdAtB) comparison = 1;
      else if (createdAtA < createdAtB) comparison = -1;

      return comparison;
    }
  };

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
            <Th>
              Item
              <span> </span>
              <Button
                className="sort"
                onClick={handleSort}
                size="xs"
                colorScheme="blue"
              >
                Sort: {isSorted ? "A → Z" : "Recently Added"}
              </Button>
            </Th>
            <Th>Quantity</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <MotionTBody layout className="item-tbody">
          {items &&
            items.sort(sorter).map((item, index) => (
              <MotionTr
                layout
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
                  <MotionInput
                    initial="out"
                    style={{
                      color: colorStart
                        .mix(colorEnd, (1 / items.length) * index)
                        .hex(),
                      position: "static",
                    }}
                    whileHover={{ scale: 1.2 }}
                    type="text"
                    variant="unstyled"
                    defaultValue={item.text}
                    value={item.text}
                    onChange={(event) => editItem(item.id, event.target.value)}
                  />
                </Td>
                <Td>
                  <MotionInput
                    whileHover={{ scale: 1.2 }}
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
        </MotionTBody>
      </Table>
    </Box>
  );
}

export default Items;
