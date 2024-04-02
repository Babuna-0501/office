import React, { useContext } from "react";
import css from "./collectionheader.module.css";
import CollectionHook from "../../Hooks/CollectionHook";
import { Button } from "../common";
const CollectionHeader = () => {
  const collectctx = useContext(CollectionHook);

  const selectHandler = () => {
    collectctx.setCollectionModal(true);
  };
  return (
    <Button onClick={selectHandler} variant="primary" size="medium">
      Шинээр нэмэх
    </Button>
  );
};

export default CollectionHeader;
