import { NextApiRequest, NextApiResponse } from "next";
import { getLike } from "../../utils/initDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const mongoResponse = await getLike(request.body);
};