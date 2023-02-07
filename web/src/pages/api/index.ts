import axios, { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const serverEndpoint =
  process.env.NODE_ENV === 'production'
    ? 'http://server:3001/graphql'
    : 'http://localhost:3001/graphql'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const request: AxiosRequestConfig = {
    ...req,
    method: 'POST',
    url: serverEndpoint,
    data: req.body,
    withCredentials: true,
    headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
  }

  const response = await axios(request)
  if (response.headers['set-cookie']) {
    res.setHeader('set-cookie', response.headers['set-cookie'])
  }
  res.send(response.data)
}
