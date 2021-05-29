import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import classnames from "classnames";
function Sidebar(props) {
  const routesArr = [
    {
      id: 0,
      link: "/home",
      content: "Home",
    },
    {
      id: 1,
      link: "/addPost",
      content: "Add Post",
    },
    {
      id: 2,
      link: "/account",
      content: "Account",
    },
  ];
  const router = useRouter();
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col text-white font-bold cursor-pointer">
      {routesArr.map((route) => {
        return (
          <div
            className={classnames("my-10 mx-4 p-4", {
              border: router.pathname.includes(route.link),
            })}
            key={route.id}
          >
            <Link href={route.link}>{route.content}</Link>
          </div>
        );
      })}

      <div className="p-10">
        <div className="text-white font-extrabold text-lg">
          <button
            className="border-2 rounded-md bg-red-500 focus:outline-none border-black flex justify-center items-center h-40 w-84p"
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
