import React from "react";
import Image from "next/image";
import menuIcon from "../../images/hamburger.svg";
import close from "../../images/Close.svg";
import icon from "../../images/wall.png";
import logout from "../../images/logout.svg";
import { useSession, signOut, signIn } from "next-auth/client";
import { useRouter } from "next/router";

function Navbar(props) {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <div className="fixed z-999 inset-0 h-80 bg-black flex items-center justify-start px-20 md:px-80">
      <div
        className="md:hidden block left-20 absolute focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          setmobileMenu(!mobileMenu);
        }}
      >
        {!props.mobileMenu ? (
          <Image src={menuIcon} alt="menu" width="30px" height="30px" />
        ) : (
          <Image src={close} alt="menu" width="20px" height="20px" />
        )}
      </div>
      <div className="flex justify-between w-full cursor-pointer">
        <div className="flex items-center">
          <img src={icon} alt={"logo"} className="h-40 w-40 rounded-5 mr-10" />
          <h1 className="text-22 text-white font-medium">WALL</h1>
        </div>
        <div className="flex items-center">
          {session && !loading ? (
            <div className="flex items-center gap-20">
              <div className="text-white text-18 font-medium ">
                {session.user.name}
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/home");
                  signOut();
                }}
              >
                <img src={logout} alt="menu" className="w-20 h-20" />
              </div>
            </div>
          ) : (
            !loading &&
            !session && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
                className="text-white text-18 font-medium "
              >
                Login
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
