import { useSession } from "next-auth/client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import GuestSidebar from "../GuestSidebar";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";
import Navbar from "../Navbar";

function Pagelayout(props) {
  const [session, loading] = useSession();
  const [display, setdisplay] = useState(true);
  const [mobileMenu, setmobileMenu] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (session === null) {
        setdisplay(false);
      } else if (session) {
        setdisplay(true);
      }
    }
  });

  return (
    <div className="container min-h-screen w-full flex mx-auto pt-80">
      <Navbar mobileMenu={mobileMenu} />
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
      <div className="flex w-full border-l border-r shadow-xl">
        <div className="md:w-300 md:min-w-300 hidden md:block bg-theme">
          <div div className="hidden md:flex fixed top-80 h-full">
            {display ? <Sidebar /> : <GuestSidebar />}
          </div>
        </div>
        {mobileMenu ? (
          <div className={classnames("fixed w-240 inset-0 top-80 z-999")}>
            <Sidebar />
          </div>
        ) : null}
        <div className="flex flex-grow w-full z-50 relative">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Pagelayout;
