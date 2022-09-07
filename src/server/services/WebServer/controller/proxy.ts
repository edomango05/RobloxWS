import {Request, Response, NextFunction} from 'express'

export default (req:Request, res:Response, next:NextFunction) => {
  const useragent = req.headers['user-agent']
  if (useragent !== "Roblox/Linux"  || req.headers['roblox-id'] != process.env.ROBLOX_PLACEID ) return res.sendStatus(405);
  next() 
}
