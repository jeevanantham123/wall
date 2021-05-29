import React from "react";
import ReactTinyLink from "../ReactLink";

function PostCard(props) {
  const posts = props.posts;

  return (
    <div>
      <div className="mt-20 min-h-screen overflow-y-scroll">
        {posts?.length &&
          posts.map((post) => {
            return (
              <div className="w-300 md:w-500 border shadow my-20 flex flex-col p-20">
                <div>{post.title}</div>
                <div className="flex mt-20 min-w-full w-full justify-center">
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={post?.link}
                    // proxyUrl={"https://cors-anywhere.herokuapp.com/corsdemo"}
                    onError={() => {
                      // toast.error("Unable to Preview!");
                      //   setPreview(false);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PostCard;
