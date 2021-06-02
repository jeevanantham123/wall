import React from "react";
import Pagelayout from "../components/PageLayout";
import PostForm from "../components/PostForm";

function addPost() {
  return (
    <Pagelayout>
      <div className="flex w-full flex-col items-center">
        <h1 className="text-2xl mt-10">Add new Post</h1>
        <div className="relative border shadow flex flex-col h-full mb-20 m-auto w-full md:w-60p py-40 min-w-full md:min-w-60p items-center">
          <PostForm render={"createPost"} />
        </div>
      </div>
    </Pagelayout>
  );
}

export default addPost;
