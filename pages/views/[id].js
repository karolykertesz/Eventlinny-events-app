import React, { useEffect, useState } from "react";
import BigLoader from "../../components/UI/BigLoader";
import { useRouter } from "next/router";
import firebase from "firebase";
import EventComp from "../../components/eventComp";
import { getKeys, findById } from "../../data";

const ViewEmailEvent = ({ single }) => {
  if (!single) {
    return <BigLoader />;
  }
  return <EventComp single={single} />;
};

export async function getStaticProps(context) {
  const id = context.params.id;
  let dd = await findById(id);
  return {
    props: {
      single: dd,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const events = await getKeys();
  const paths = events.map((item) => ({ params: { id: item.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export default ViewEmailEvent;
