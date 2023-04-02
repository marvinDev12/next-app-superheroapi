import { Hero } from "@/interfaces/Hero";
import { convertObjectKeysToCamel } from "@/utils/commonUtils";
import { NextApiRequest, NextApiResponse } from "next";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

type ErrorResponse = {
  response: "error";
  error: string;
};

type SuccessResponse = {
  response: "success";
  results: Hero[];
};

type APIResponse = SuccessResponse | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchKey } = req.query as { searchKey: string };

  if (!searchKey || searchKey.trim().length === 0)
    return res.status(200).json({ heroes: [] });

  try {
    const response = await fetch(
      `https://superheroapi.com/api/${ACCESS_TOKEN}/search/${searchKey}`
    );
    const result: APIResponse = await response.json();

    if (result.response === "error") throw new Error(result.error);

    return res
      .status(200)
      .json({ heroes: result.results.map(convertObjectKeysToCamel) });
  } catch (error: unknown) {
    return res.status(500).end();
  }
};

export default handler;
