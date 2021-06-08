import { fetchPosts } from "./slice";
import { getPost } from "../../services/post";

export const fetchPostsSaga = () => async (dispatch) => {
  try {
    await getPost().then((data) => {
      dispatch(fetchPosts(data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};
