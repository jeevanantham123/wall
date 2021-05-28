import React from "react";
import { useState } from "react";
import Pagelayout from "../components/PageLayout.js";
import { toast } from "react-toastify";
import axios from "axios";
import is_url from "../lib/validator.js";
import dynamic from "next/dynamic";

const ReactTinyLink = dynamic(
  () => import("react-tiny-link").then((mod) => mod.ReactTinyLink),
  { ssr: false }
);

function addPost() {
  const [title, settitle] = useState("");
  const [link, setLink] = useState("");

  const addPost = async () => {
    const body = { title, link };
    // console.log(body);
    if (is_url(link.trim())) {
      await axios
        .post("/api/post", {
          body,
        })
        .then((response) => {
          toast.success("Success");
          setLink("");
          settitle("");
        })
        .catch((error) => {
          console.error(error);
          toast.error(String(error).slice(0, 10));
        });
    } else {
      toast.error("Enter a link!");
    }
  };

  return (
    <Pagelayout>
      <div className="flex w-full min-h-screen flex-col items-center">
        <h1 className="text-2xl mt-10">Add new Post</h1>
        <div className="relative border shadow flex flex-col min-h-500 m-auto w-60p py-40 min-w-60p items-center">
          <div className="flex gap-12">
            <label>Title</label>
            <input
              className="border-black border rounded px-4"
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div className="flex gap-12 mt-20">
            <label>Link</label>
            <input
              className="border-black border rounded px-4"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          {link.length && is_url(link) ? (
            <div className="m-20 p-20">
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={link}
                onError={() => toast.error("Unable to Preview!")}
              />
            </div>
          ) : null}

          <button
            onClick={() => {
              if (title.length && link.length) addPost();
            }}
            className="absolute bottom-20 w-100 bg-blue-500 text-white mt-20 rounded-md py-4 focus:outline-none"
          >
            Add
          </button>
        </div>
      </div>
    </Pagelayout>
  );
}

export default addPost;
