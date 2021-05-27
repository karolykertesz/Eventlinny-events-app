import React from "react";
import StartItem from "../../../components/startitem";
import { allUserPref } from "../../../helpers/wrappers/userPrefwrap";

const AddNewPref = () => {
  return <div></div>;
};
const userpre = allUserPref("eIz9zNRWovaE0Jnm3SkhaogqUHn2").then((i) => {
  console.log(i);
});

export default AddNewPref;

// export async function getServerSideProps(context) {
//   const uid = context.params.uid;
// }
