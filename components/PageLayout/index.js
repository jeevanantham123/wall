import { useSession } from "next-auth/client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import GuestSidebar from "../GuestSidebar";
import Image from "next/image";
import menuIcon from "../../images/hamburger.svg";
import close from "../../images/Close.svg";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";

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
    <div className="container min-h-screen w-full px-20 md:px-50 flex mx-auto pt-50">
      <div className="fixed z-999 inset-0 h-50 bg-blue-500 cursor-pointer flex items-center justify-center">
        <div
          className="md:hidden block left-20 absolute focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            setmobileMenu(!mobileMenu);
          }}
        >
          {!mobileMenu ? (
            <Image src={menuIcon} alt="menu" width="30px" height="30px" />
          ) : (
            <Image src={close} alt="menu" width="20px" height="20px" />
          )}
        </div>
        <h1 className="text-2xl text-white font-bold">WALL</h1>
      </div>
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
        <div className="md:w-300 md:min-w-300 hidden md:block bg-blue-900">
          <div div className="hidden md:flex fixed top-50 h-full">
            {display ? <Sidebar /> : <GuestSidebar />}
          </div>
        </div>
        {mobileMenu ? (
          <div className={classnames("fixed w-240 inset-0 top-50 z-999")}>
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
