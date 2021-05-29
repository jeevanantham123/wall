import { useSession, signOut } from "next-auth/client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Router from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <div className="w-full min-w-full flex min-h-screen">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div div className="hidden md:block w-16p">
            <Sidebar signOut={signOutClicked} />
          </div>
          <div className="w-full md:w-84p">{props.children}</div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Pagelayout;
