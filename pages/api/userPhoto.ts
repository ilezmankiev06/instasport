import { NextApiRequest, NextApiResponse } from "next";
import { getUsersPhotoByToken } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getUsersPhotoByToken(request.query.usersToken);
  response.json(mongoResponse);
};
