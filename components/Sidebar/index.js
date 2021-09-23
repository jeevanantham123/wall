import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import classnames from "classnames";
// import { signOut } from "next-auth/client";

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
      link: "/yourPost",
      content: "Posts",
    },
    // {
    //   id: 3,
    //   link: "/account",
    //   content: "Account",
    // },
  ];
  const router = useRouter();
  return (
    <div className="items-stretch h-full flex flex-col text-white font-bold cursor-pointer">
      {routesArr.map((route) => {
        return (
          <div
            className={classnames("my-10 font-medium mx-4 p-4", {
              border: router.pathname.includes(route.link),
            })}
            key={route.id}
          >
            <Link href={route.link}>{route.content}</Link>
          </div>
        );
      })}

      {/* <div className="p-2">
        <div className="text-white font-extrabold text-lg">
          <button
            className="border-2 rounded-md bg-red-500 focus:outline-none border-black flex justify-center items-center h-40 w-200"
            onClick={(e) => {
              e.preventDefault();
              router.push("/home");
              signOut();
            }}
          >
            Log out
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
