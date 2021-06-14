import { NextApiRequest, NextApiResponse } from "next";
import { logoutUser } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await logoutUser(request.query);
};
