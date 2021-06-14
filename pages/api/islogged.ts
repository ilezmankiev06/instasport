import { NextApiRequest, NextApiResponse } from "next";
import { getUserByCookie } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const isCookie = await getUserByCookie(request.body);
  response.send(isCookie);
};
