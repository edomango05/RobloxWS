import express, { Request, Response, NextFunction } from 'express'
import controller from '../controller/proxy'
const router = express.Router()


interface RequestCACHE {
  hash: string;
  endpoint: string;
  method: string;
  response: Response
  headers: any;
  body: any;
}

interface ResponseCACHE {
  hash: string;
  headers: any;
  status: number;
  body: any;
}

const cache = new Map<string, RequestCACHE>()
//

router.get('/api/cache/roblox/', controller,(req: Request, res: Response) => {
  res.send(
    Object.values(Object.fromEntries(cache)).map((v: Partial<RequestCACHE>) => {
      const { hash, endpoint, method, headers, body } = v
      return {
        hash,
        endpoint,
        method,
        headers,
        body
      }
    })
  )

})

//
router.post('/api/cache/roblox/', controller,async (req: Request, res: Response) => {
  const body = req.body as ResponseCACHE
  const cache_element = cache.get(body.hash)
  if (!cache_element) return res.sendStatus(404);
  try {
    cache_element.response.status(body.status).header(body.headers).send(body.body || {})
  } catch (e) {
    console.error(e)
  }
  cache.delete(body.hash)
  res.sendStatus(200)
})
//

router.use('/robloxws/*', (req: Request, res: Response) => {
  const id = (new Date()).getTime().toString()
  cache.set(id, {
    hash: id,
    endpoint: req.url,
    method: req.method,
    response: res,
    headers: req.header,
    body: req.body
  })
})


export default router
