import { NextApiRequest, NextApiResponse } from "next";
import { getUserNameOnComment } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getUserNameOnComment(request.query.idUser);
  response.json(mongoResponse);
};
