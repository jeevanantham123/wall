import axios from "axios";

export const getPost = async () => {
  return await axios
    .get("/api/post/getPost")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addPostAPI = async (data) => {
  return await axios
    .post("/api/post", {
      data,
    })
    .then((res) => {
      if (res.status === 200)
        return {
          status: "Success",
        };
    })
    .catch((err) => {
      console.log(err);
    });
};
