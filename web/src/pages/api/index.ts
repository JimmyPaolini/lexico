import axios, { AxiosRequestConfig } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export const serverEndpoint = `http://${
  process.env.NODE_ENV === "production" ? "server" : "localhost"
}:3001/graphql`

const circularReplacer: () =>
  | ((this: any, key: string, value: any) => any)
  | undefined = () => {
  const seen = new WeakSet()
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null)
      if (seen.has(value)) return
      else seen.add(value)
    return value
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const request: AxiosRequestConfig = {
    method: "POST",
    url: serverEndpoint,
    data: req.body,
    headers: req.headers,
    withCredentials: true,
  }

  const response = await axios(request).catch((e) => {
    console.log(JSON.stringify(e, circularReplacer()))
    return Promise.reject(e)
  })

  if (response.headers["set-cookie"])
    res.setHeader("set-cookie", response.headers["set-cookie"])
  res.send(response.data)
}
