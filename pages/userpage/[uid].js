import react, { Fragment, useEffect, useState, useCallback } from "react";
import UserProfileTop from "../../components/userProfileTop";
import { useRouter } from "next/router";
import firebase from "firebase";
const UserProfile = ({ userPref }) => {
  return <div></div>;
};

export async function getstaticPaths() {
  return {
    paths: [{ params: { uid: "1" } }, { params: { uid: "2" } }],
    fallback: true,
  };
}
export async function getStaticProps(context) {}
export default UserProfile;
