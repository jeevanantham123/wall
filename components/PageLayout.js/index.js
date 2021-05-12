import { useSession, signOut } from "next-auth/client";
import React, { useState } from "react";
import Sidebar from "../Sidebar.js";
import Router from "next/router";
import { useEffect } from "react";

function Pagelayout(props) {
  const [session, loading] = useSession();
  const [display, setdisplay] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (session === null) {
        Router.push("/");
      } else if (session) {
        setdisplay(true);
      }
    }
  });
  const signOutClicked = () => {
    signOut();
  };
  return (
    <>
      {display ? (
        <div className="w-full flex min-h-screen">
          <div div className="hidden md:block w-16p">
            <Sidebar signOut={signOutClicked} />
          </div>
          <div className="w-84p">{props.children}</div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Pagelayout;
