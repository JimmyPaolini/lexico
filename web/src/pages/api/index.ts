import axios, { AxiosRequestConfig } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { SERVER_HOST } from "../../../../utils/env"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = {
    method: "POST",
    url: `http://${SERVER_HOST}:3001/graphql`,
    data: req.body,
    headers: req.headers,
  } as AxiosRequestConfig

  const response = await axios(request)

  res.send(response.data)
}
