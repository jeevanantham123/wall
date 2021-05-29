import React from "react";
import { useState } from "react";
import Pagelayout from "../components/PageLayout";
import { toast } from "react-toastify";
import axios from "axios";
import is_url from "../lib/validator.js";
import ReactTinyLink from "../components/ReactLink";

function addPost() {
  const [title, settitle] = useState(null);
  const [link, setLink] = useState(null);
  const [tag, setTag] = useState();
  const [tagList, setTagList] = useState([]);
  const [preview, setPreview] = useState(true);
  const addPost = async () => {
    const body = { title, link, tagList };
    // console.log(body);
    await axios
      .post("/api/post", {
        body,
      })
      .then((response) => {
        toast.success("Success");
        setLink("");
        settitle("");
        setTag("");
        setTagList([]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(String(error).slice(0, 10));
      });
  };

  return (
    <Pagelayout>
      <div className="flex w-full min-h-screen flex-col items-center">
        <h1 className="text-2xl mt-10">Add new Post</h1>
        <div className="relative border shadow flex flex-col min-h-80vh md:min-h-90vh m-auto w-full md:w-60p py-40 min-w-full md:min-w-60p items-center">
          <div className="flex flex-wrap gap-12 w-full items-center justify-center">
            <label>Title</label>
            <input
              className="border-black border rounded px-4 w-300"
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-12 mt-20 w-full items-center justify-center">
            <label>Link</label>
            <input
              className="border-black border rounded px-4 w-300"
              type="text"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setPreview(true);
              }}
            />
          </div>
          {link?.length && is_url(link) && preview ? (
            <div className="flex mt-20 p-20 min-w-full w-full justify-center">
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={link}
                // proxyUrl={"https://cors-anywhere.herokuapp.com/corsdemo"}
                onError={() => {
                  // toast.error("Unable to Preview!");
                  setPreview(false);
                }}
              />
            </div>
          ) : null}
          <div className="flex flex-wrap gap-12 mt-20 w-full items-center justify-center">
            <label>Tag</label>
            <input
              className="border-black border rounded px-4 w-300"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <div className="">
            <button
              onClick={() => {
                if (tag?.length) {
                  setTag("");
                  setTagList([...tagList, tag]);
                } else toast.error("Tag value cannot be empty!");
              }}
              className="w-100 bg-green-400 text-black mt-20 rounded-md h-30 focus:outline-none"
            >
              Add tag
            </button>
          </div>
          {tagList.length ? (
            <div className="flex flex-wrap gap-10 w-300 my-20">
              {tagList.map((tag) => {
                return <p>#{tag}</p>;
              })}
            </div>
          ) : null}
          <button
            onClick={() => {
              if (title?.length && link?.length && tagList?.length) addPost();
              else {
                if (!is_url(link?.trim())) toast.error("Enter a link!");
                else {
                  toast.error("Fields cannot be empty!");
                }
              }
            }}
            className="absolute bottom-20 w-100 bg-blue-500 text-white mt-40 rounded-md py-4 focus:outline-none"
          >
            Add
          </button>
        </div>
      </div>
    </Pagelayout>
  );
}

export default addPost;
