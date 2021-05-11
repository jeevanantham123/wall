import { useSession, signOut } from "next-auth/client";
import React, { useState } from "react";
import Sidebar from "../Sidebar.js";
import Router from "next/router";
import { useEffect } from "react";

function Pagelayout(props) {
  const [session, loading] = useSession();
  const [signout, setSignout] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (!session && !signOut && !loading) {
        Router.push("/");
      } else if (!session && signOut) {
        Router.push("/");
      }
    }, 1000);
  }, [signout]);
  const signOutClicked = () => {
    signOut();
    setSignout(true);
  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="hidden md:block w-16p">
        <Sidebar signOut={signOutClicked} />
      </div>
      <div className="w-84p">{props.children}</div>
    </div>
  );
}

export default Pagelayout;
