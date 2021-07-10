import React from "react";
import Form from "../Form/Form";
import Item from "../Item/Item";
import Logout from "../Logout/Logout";
import { Button, Container } from "@chakra-ui/react";
import { firestore } from "../../firebase";

import "./List.css";

import { useCollectionData } from "react-firebase-hooks/firestore";

function List() {
  const itemsRef = firestore.collection("items");
  const query = itemsRef.orderBy("createdAt").limit(25);

  const [items] = useCollectionData(query, { idField: "id" });

  const removeItem = async (id) => await itemsRef.doc(id).delete();

  const removeAll = async () => {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      return;
    }

    // Delete documents in a batch
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      removeAll();
    });
  };

  const editItem = async (id, text) => {
    await itemsRef.doc(id).update({ text: text });
  };

  const editQuantity = async (id, quantity) => {
    await itemsRef.doc(id).update({ quantity: quantity });
  };

  return (
    <Container id="list">
      <h1>Shopping List</h1>

      <Container className="shopping-list-form">
        <Form itemsRef={itemsRef} />
        <Button colorScheme="red" onClick={removeAll}>
          Clear List
        </Button>
      </Container>
      <Item
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        editQuantity={editQuantity}
        query={query}
      />
      <Container>
        <Logout />
      </Container>
    </Container>
  );
}

export default List;
