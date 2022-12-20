import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const serverEndpoint = `http://${
  process.env.NODE_ENV === 'production' ? 'server' : 'localhost'
}:3001/graphql`

export const circularReplacer: () =>
  | ((this: any, key: string, value: any) => any)
  | undefined = () => {
  const seen = new WeakSet()
  return (_: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return
      else seen.add(value)
    }
    return value
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const request: AxiosRequestConfig = {
    ...req,
    method: 'POST',
    url: serverEndpoint,
    data: req.body,
    withCredentials: true,
    headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
  }

  try {
    const response = await axios(request)
    if (response.headers['set-cookie']) {
      res.setHeader('set-cookie', response.headers['set-cookie'])
    }
    res.send(response.data)
  } catch (error: unknown) {
    console.log(
      JSON.stringify((error as AxiosError).response, circularReplacer()),
    )
    throw error
  }
}
