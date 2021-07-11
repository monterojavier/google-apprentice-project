import React from "react";
import Form from "../Form/Form";
import Items from "../Items/Items";
import { Box } from "@chakra-ui/react";
import { firestore } from "../../firebase";

import "./List.css";

import { useCollectionData } from "react-firebase-hooks/firestore";

function List(user) {
  const listRef = firestore
    .collection("Users")
    .doc(user.user.uid)
    .collection("List");
  const queryItems = listRef.orderBy("createdAt");

  const [items] = useCollectionData(queryItems, { idField: "id" });

  const removeItem = async (id) => {
    await listRef.doc(id).delete();
  };

  const editItem = async (id, text) => {
    await listRef.doc(id).update({ text: text });
  };

  const editQuantity = async (id, quantity) => {
    await listRef.doc(id).update({ quantity: quantity });
  };

  return (
    <Box id="list">
      <Box className="shopping-list-form">
        <Form listRef={listRef} />
      </Box>
      <Items
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        editQuantity={editQuantity}
      />
    </Box>
  );
}

export default List;
