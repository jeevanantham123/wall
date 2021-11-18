import React, { useState } from "react";
import ReactTinyLink from "../ReactLink";
import user from "../../images/Profile.svg";
import deleteIcon from "../../images/delete.svg";
import edit from "../../images/edit.svg";
import Modal from "../Modal";
import PostForm from "../PostForm";
import { toast } from "react-toastify";
import { deletePostbyId } from "../../services/post";

function PostCard(props) {
  const posts = props.posts;
  const deltePostApiCall = async (id) => {
    deletePostbyId(id)
      .then((response) => {
        setTimeout(() => {
          setdisabled(false);
        }, 1000);
        if (response.status === "Success") {
          toast.success("Deleted");
          props.handleChange();
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setdisabled(false);
        }, 1000);
        console.error(error);
        toast.error(String(error).slice(0, 10));
      });
  };

  const [editModal, seteditModal] = useState(false);
  const [sendModal, setsendModal] = useState(null);
  const [disabled, setdisabled] = useState(false);
  return (
    <div>
      <div className="mt-20 min-h-screen overflow-y-scroll">
        {editModal ? (
          <Modal
            closeModal={() => {
              seteditModal(false);
            }}
          >
            <h2 className="mt-20 text-xl font-semibold">Update Post</h2>
            <div className="flex justify-center items-center flex-col p-20">
              <PostForm
                render={"editPost"}
                post={posts[sendModal]}
                handleChange={() => {
                  props.handleChange();
                }}
              />
            </div>
          </Modal>
        ) : null}
        {posts?.length
          ? posts.map((post, index) => {
              return (
                <div
                  className="w-full md:w-500 border shadow my-20 flex flex-col p-20"
                  key={index}
                >
                  <div className="flex justify-between items-center mb-20">
                    <div className="flex items-center">
                      <div className="bg-blue-500 w-30 h-30 p-2 rounded-full">
                        <img src={user} alt="user" className="w-30 h-30" />
                      </div>
                      <div className="ml-10 font-semibold text-xl">
                        {post?.author?.name}
                      </div>
                    </div>
                    {props.user ? (
                      <div className="flex gap-16 cursor-pointer">
                        <div className=" w-20 h-20 rounded-full">
                          <img
                            src={edit}
                            alt="user"
                            className="w-20 h-20"
                            onClick={(e) => {
                              e.preventDefault();
                              seteditModal(true);
                              setsendModal(index);
                            }}
                          />
                        </div>
                        <button
                          className=" w-20 h-20 rounded-full disabled:opacity-25"
                          onClick={(e) => {
                            setdisabled(true);
                            e.preventDefault();
                            deltePostApiCall(post.id);
                          }}
                          disabled={disabled}
                        >
                          <img
                            src={deleteIcon}
                            alt="user"
                            className="w-20 h-20"
                          />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="text-lg font-medium">{post?.title}</div>
                  <div className="mt-20 min-w-full w-full hidden justify-center">
                    <ReactTinyLink
                      cardSize="small"
                      showGraphic={true}
                      maxLine={2}
                      minLine={1}
                      defaultMedia={true}
                      url={post?.link}
                    />
                  </div>
                  {post?.image?.id ? (
                    <div className="mx-auto border p-10 mt-10">
                      <img
                        src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${post?.image?.version}/${post?.image?.publicId}.${post?.image?.format}`}
                        key={post?.image?.id}
                      />
                    </div>
                  ) : null}

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
