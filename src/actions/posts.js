import * as api from "../api";

//actions creators
const getPosts = () => async (dispatch) => {
  try {
      const {data} = await api.fetchPosts();
  } catch (error) {}

  const action = {
    type: "FETCH_ALL",
    payload: [],
  };
  dispatch(action);
};
