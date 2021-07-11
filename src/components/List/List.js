import React from "react";
import Form from "../Form/Form";
import Item from "../Item/Item";
import { Box } from "@chakra-ui/react";
import { firestore } from "../../firebase";

import "./List.css";

import { useCollectionData } from "react-firebase-hooks/firestore";

function List(user) {
  const itemsRef = firestore
    .collection("Users")
    .doc(user.user.uid)
    .collection("Items");
  const queryItems = itemsRef.orderBy("createdAt");

  const [items] = useCollectionData(queryItems, { idField: "id" });

  const removeItem = async (id) => {
    await itemsRef.doc(id).delete();
  };

  const editItem = async (id, text) => {
    await itemsRef.doc(id).update({ text: text });
  };

  const editQuantity = async (id, quantity) => {
    await itemsRef.doc(id).update({ quantity: quantity });
  };

  return (
    <Box id="list">
      <Box className="shopping-list-form">
        <Form itemsRef={itemsRef} />
      </Box>
      <Item
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        editQuantity={editQuantity}
      />
    </Box>
  );
}

export default List;
