import React from "react";
import { useSession } from "next-auth/client";

function addPost() {
  const [session] = useSession();
  return (
    <div>
      {session && (
        <div>
          <button>Add new Post</button>
        </div>
      )}
    </div>
  );
}

export default addPost;
