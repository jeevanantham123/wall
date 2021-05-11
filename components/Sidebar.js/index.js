import Link from "next/link";
import React from "react";
function Sidebar(props) {
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col text-white font-bold cursor-pointer">
      <div className="p-10 ">
        <Link href="/home">Home</Link>
      </div>
      <div className="p-10">
        <Link href="/addPost">Add post</Link>
      </div>
      <div className="p-10">
        <Link href="/account">Account</Link>
      </div>
      <div className="p-10">
        <div className="text-white font-extrabold text-lg">
          <button
            className="border-2 rounded-md bg-red-500 focus:outline-none border-black flex justify-center items-center h-40 w-200"
            onClick={(e) => {
              e.preventDefault();
              props.signOut();
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
