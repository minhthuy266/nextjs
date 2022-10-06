// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'

type Data = {
  name: string
}

const proxy = httpProxy.createProxyServer();

export const config = {
    api: {
        bodyParser: false
    }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

// Don't send cookies to API server 

req.headers.cookie = ""

proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: false,
})

//   res.status(200).json({ name: 'PATH - Match all here' })
}
