import { NextApiRequest, NextApiResponse } from "next";
import { getCommentsByPost } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getCommentsByPost(request.query.postId);
  // const users = mongoResponse.map((value) => value.userName).toString();
  if (mongoResponse !== "") {
    response.json(mongoResponse);
  } else {
    response.send({ message: "ERROR" });
  }
};
