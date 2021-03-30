import axios, { AxiosRequestConfig } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { SERVER_HOST } from "../../../../utils/env"

export const serverEndpoint = `http://${
  process.env.NODE_ENV === "production" ? SERVER_HOST : "localhost"
}:3001/graphql`

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const request = {
    method: "POST",
    url: serverEndpoint,
    data: req.body,
    headers: req.headers,
  } as AxiosRequestConfig

  const response = await axios(request)

  if (response.headers["set-cookie"])
    res.setHeader("set-cookie", response.headers["set-cookie"])
  res.send(response.data)
}
