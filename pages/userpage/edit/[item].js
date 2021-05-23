import React from "react";
import { useRouter } from "next/router";
const Item = () => {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  return <div></div>;
};

export default Item;
