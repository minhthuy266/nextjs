import Cookies from "cookies";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

type Data = {
  name: string;
};

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve, reject) => {
    // Don't send cookies to API server

    const cookies = new Cookies(req, res);

    if (cookies.get("access_token")) {
      req.headers.Authorization = `Bearer ${cookies.get("access_token")} `;
    }

    req.headers.cookie = "";

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once("proxyRes", () => {
      resolve(true);
    });

    //   res.status(200).json({ name: 'PATH - Match all here' })
  });
}
