import React, { useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  //   clearAllBodyScrollLocks,
} from "body-scroll-lock";
import close from "../../images/Close.svg";
function Modal(props) {
  const targetElement = document.querySelector("body");
  useEffect(() => {
    disableBodyScroll(targetElement);
  }, []);
  return (
    <div
      className="container md:mx-auto px-20 md:px-50 fixed inset-0 min-h-screen  z-999"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex justify-center items-center text-center w-full h-full bg-black bg-opacity-10 align-middle">
        <div className="relative min-w-full md:min-w-60p min-h-80vh h-80vh max-h-80vh bg-white overflow-y-scroll mt-50 rounded-lg">
          <div className="absolute right-0 m-10 cursor-pointer">
            <img
              src={close}
              alt="close"
              className="w-14 h-14"
              onClick={() => {
                props.closeModal();
                enableBodyScroll(targetElement);
              }}
            />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
