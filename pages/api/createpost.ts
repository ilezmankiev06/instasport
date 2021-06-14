import { NextApiRequest, NextApiResponse } from "next";
import { createPost } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await createPost(request.body);
  if (mongoResponse.insertedCount === 1) {
    response.json({ message: "register OK" });
  } else {
    response.json({ message: "ERROR" });
  }
};
