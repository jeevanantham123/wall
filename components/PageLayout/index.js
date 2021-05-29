import { useSession, signOut } from "next-auth/client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import GuestSidebar from "../GuestSidebar";
import { useRouter } from "next/router";

// import Router from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pagelayout(props) {
  const [session, loading] = useSession();
  const [display, setdisplay] = useState(true);
  const router = useRouter();

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
    <div className="container min-h-screen w-full px-50 flex mx-auto pt-50">
      <div className="fixed z-999 inset-0 h-50 bg-blue-500 cursor-pointer flex items-center justify-center">
        <h1 className="text-2xl text-white font-extrabold">WALL</h1>
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
        <div className="md:w-300 md:min-w-300 hidden xl:block bg-blue-900">
          <div div className="hidden xl:flex fixed top-50 h-full">
            {display ? <Sidebar /> : <GuestSidebar />}
          </div>
        </div>
        <div className="flex flex-grow w-full z-50 relative">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Pagelayout;
