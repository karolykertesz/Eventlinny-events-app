import React from "react";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/publicchat.module.css";
import BigLoader from "../../components/UI/BigLoader";
import Shared from "./chatShared";
import { useUserInfo } from "../../helpers/firebase-hooks/get-user-info";
import { useChatMsessages } from "../../helpers/firebase-hooks/get-chat-messages";
const Public = () => {
  useRedirect();
  const user = useAuth().user;
  const router = useRouter();
  const id = router.query.id;

  const { userInfo } = useUserInfo(user && user.uid);
  const currImage =
    userInfo && userInfo.image_url ? userInfo.image_url : "/images/noimage.svg";
  const { messages } = useChatMsessages(id, "public");

  if (!user) {
    return <BigLoader />;
  }
  return (
    <div className={classes.top}>
      <Shared
        type="public_chat"
        id={id && id}
        messages={messages && messages.length > 0 ? messages : null}
        user={user && user}
        currImage={currImage && currImage}
      />
    </div>
  );
};
export default Public;
