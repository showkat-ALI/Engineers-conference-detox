import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../../Contexts/AuthContexts";
import axios from "axios";
const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  console.log(user);
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const [loading, setLoading] = useState(true);
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get(
        "https://api.chatengine.io/users/me",

        {
          mode: "no-cors",
          headers: {
            "project-id": "86b2efa5-b0f2-4152-ad31-1b6c8f335926",
            "user-name": user?.email,
            "user-secret": user?.uid,
          },
        }
      )
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user?.email);
        formdata.append("username", user?.email);
        formdata.append("secret", user?.uid);
        getFile(user?.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formdata, {
              mode: "no-cors",

              headers: {
                "private-key": "e3799861-26b9-41ec-908e-aec24a99859e",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);
  if (!user || loading) return "Loading";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Engineers Arena</div>
        <div className="logout-tab" onClick={() => handleLogout()}>
          logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="86b2efa5-b0f2-4152-ad31-1b6c8f335926"
        userName={user?.email}
        userSecret={user?.uid}
      />
    </div>
  );
};

export default Chats;
