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

export const getPostbyId = async () => {
  return await axios
    .get("/api/post/getPost/byId")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deletePostbyId = async (id) => {
  return await axios
    .delete(`/api/post/${id}`)
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

export const updatePostAPI = async (data) => {
  return await axios
    .post("/api/post/update", {
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
