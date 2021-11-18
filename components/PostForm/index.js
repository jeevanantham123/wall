import React, { useEffect } from "react";
import { toast } from "react-toastify";
import is_url from "../../lib/validator";
import ReactTinyLink from "../ReactLink";
import { addPostAPI, updatePostAPI } from "../../services/post";
import { useState } from "react";
import Upload from "../Upload";

function PostForm(props) {
  const post = props?.post;
  const postId = post?.id;
  const render = props?.render;
  const [title, settitle] = useState(post?.title ? post.title : "");
  const [link, setLink] = useState(post?.link ? post.link : "");
  const [tag, setTag] = useState();
  const [tagList, setTagList] = useState(post?.tags ? post.tags : []);
  const [preview, setPreview] = useState(true);
  const [disabled, setdisabled] = useState(false);
  const [uploadData, setuploadData] = useState();

  const addPostApiCall = async () => {
    const imageId = uploadData?.id;
    const body = { title, link, tagList, imageId };
    addPostAPI(body)
      .then((response) => {
        if (response.status === "Success") {
          toast.success("Success");
          setLink("");
          settitle("");
          setTag("");
          setTagList([]);
          setuploadData("");
        }
        setdisabled(false);
      })
      .catch((error) => {
        console.error(error);
        setdisabled(false);
        toast.error(String(error).slice(0, 10));
      });
  };

  const updatePostApiCall = async () => {
    const body = { title, link, tagList, postId };
    updatePostAPI(body)
      .then((response) => {
        if (response.status === "Success") {
          toast.success("Success");
        }
        props.handleChange();
        setdisabled(false);
      })
      .catch((error) => {
        console.error(error);
        setdisabled(false);
        toast.error(String(error).slice(0, 10));
      });
  };

  return (
    <>
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
            onError={() => {
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
      {tagList.length ? (
        <button
          className="py-4 rounded w-100 bg-red-500 text-white focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            setTagList([]);
          }}
        >
          clear Tags
        </button>
      ) : null}
      <Upload setuploadData={setuploadData} uploadData={uploadData} />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (title?.length && link?.length && tagList?.length) {
            setdisabled(true);
            if (render === "createPost") addPostApiCall();
            else updatePostApiCall();
          } else {
            if (!is_url(link?.trim())) toast.error("Enter a link!");
            else {
              toast.error("Fields cannot be empty!");
            }
          }
        }}
        disabled={disabled}
        className="w-100 bg-blue-500 text-white mt-40 rounded-md py-4 focus:outline-none disabled:opacity-60"
      >
        {render === "createPost" ? "Add" : "Update"}
      </button>
    </>
  );
}

export default PostForm;
