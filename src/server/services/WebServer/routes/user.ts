import express, {Request, Response} from 'express'
import UserModel from '../../database/models/user'
const router = express.Router()
//
router.get('/api/user/:userId',async (req:Request,res:Response)=>{
  const param = req.params.userId
  if ( !param ) return res.sendStatus(400);
  const user = await UserModel.findByRobloxId(param).catch(e=>{
    res.status(500)
  })
  if ( !user ) return res.sendStatus(404)
  res.status(200).json(user)
})
//
router.post('/api/user/:userId',async (req:Request,res:Response)=>{
  const param = req.params.userId
  if ( !param ) return res.sendStatus(400);
  const user = await UserModel.createUser(param).catch(e=>{
    res.sendStatus( e.code === 11000 ? 409 :  500)
  })
  res.status(200).json(user)
})
//
router.patch('/api/user/:userId',async (req:Request,res:Response)=>{
  const param = req.params.userId
  const body = req.body
  if ( !param || !body ) return res.sendStatus(400);
  const user = await UserModel.updateUser(param, body).catch(e=>{
    res.sendStatus( e.code === 11000 ? 409 :  500)
  })
  if ( !user ) return res.status(404)
  res.status(200).json(user)
})
//

export default router
