import api from "../api";

const replyToComment = async (reply) => {
  try {
    const response = await api.post("/replies", reply);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getCommentReplies = async (id) => {
  try {
    const response = await api.get(`/replies/comment/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  replyToComment,
  getCommentReplies,
};
