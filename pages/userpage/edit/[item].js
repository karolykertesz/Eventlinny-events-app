import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../../helpers/validatehelp";
import SingleSelect from "../../../components/singleSelect";

const Item = () => {
  const router = useRouter();
  const redirect = useRedirect();

  useEffect(() => {
    return redirect;
  }, []);
  const item = router.query.item;

  return (
    <div>
      <SingleSelect item={item} />
    </div>
  );
};

export default Item;
