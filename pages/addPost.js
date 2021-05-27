import React from "react";
import { useState } from "react";
import Pagelayout from "../components/PageLayout.js";
function addPost() {
  const [title, settitle] = useState(null);
  const addPost = async () => {
    try {
      const body = { title };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Pagelayout>
      <div>
        <h1>Add new Post</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button onClick={addPost}>Add</button>
      </div>
    </Pagelayout>
  );
}

export default addPost;
