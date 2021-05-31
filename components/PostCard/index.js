import React from "react";
import ReactTinyLink from "../ReactLink";
import user from "../../images/Profile.svg";
function PostCard(props) {
  const posts = props.posts;
  console.log(posts);
  return (
    <div>
      <div className="mt-20 min-h-screen overflow-y-scroll">
        {posts?.length
          ? posts.map((post) => {
              return (
                <div className="w-full md:w-500 border shadow my-20 flex flex-col p-20">
                  <div className="flex items-center mb-20">
                    <div className="bg-blue-500 w-30 h-30 p-2 rounded-full">
                      <img src={user} alt="user" className="w-30 h-30" />
                    </div>
                    <div className="ml-10 font-bold text-xl">
                      {post?.author?.name}
                    </div>
                  </div>
                  <div className="text-lg font-medium">{post?.title}</div>
                  <div className="flex mt-20 min-w-full w-full justify-center">
                    <ReactTinyLink
                      cardSize="small"
                      showGraphic={true}
                      maxLine={2}
                      minLine={1}
                      defaultMedia={false}
                      url={post?.link}
                    />
                  </div>
                  <div className="flex gap-10">
                    {post?.tags?.length
                      ? post.tags.map((tag) => {
                          return (
                            <div className="mt-20 text-blue-400 font-medium">
                              #{tag}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default PostCard;
