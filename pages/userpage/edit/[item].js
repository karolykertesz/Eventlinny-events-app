import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../../helpers/validatehelp";
import SingleSelect from "../../../components/singleSelect";

const Item = () => {
  useRedirect();
  const router = useRouter();
  const { uid, item } = router.query;
  return (
    <div>
      <SingleSelect item={item} uid={uid} />
    </div>
  );
};

export default Item;
