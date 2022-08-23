import { Document, Model, model, Types, Schema } from "mongoose"

export interface User {
  discordId: string,
  robloxId: string,
  store: Map<string,any>
}

interface UserBaseDocument extends User, Document {
  store: Types.Map<any>;
}

export interface UserModel extends Model<UserBaseDocument> {
  findByRobloxId(id: string): Promise<UserBaseDocument>
  createUser(id: string): Promise<UserBaseDocument>
  updateUser(id:string,data:User):Promise<UserBaseDocument>
}

const UserSchema = new Schema<UserBaseDocument, UserModel>({
  discordId: {
    type: String,
  },
  robloxId: {
    type: String,
    required: true,
    unique:true
  },
  store: {
    type: Map
  }
})

// Static methods
UserSchema.statics.findByRobloxId = async function(
  this: Model<UserBaseDocument>,
  id: string
) {
  return this.findOne({
    robloxId:id
  }).exec()
}
UserSchema.statics.updateUser = async function(
  this: Model<UserBaseDocument>,
  id: string,
  data:User
) {
  return this.findOneAndUpdate(
    {robloxId:id},
    {$set:data}
  ).exec()
}

UserSchema.statics.createUser = async function(
  this: Model<UserBaseDocument>,
  id: string
) {
  return this.create({
    robloxId:id,
    discordId:'',
    store:{}
  })
}

export default model<UserBaseDocument, UserModel>("User", UserSchema)
