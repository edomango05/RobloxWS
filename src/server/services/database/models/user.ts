import { Document, Model, model, Types, Schema, Query } from "mongoose"




export interface User {
  discordId: string,
  robloxId: string,
  store: Map<string,any>,
  modlogs: any[]
}

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
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
  },
  modlogs:{
    type: Array
  },
})

// Virtuals
/*
UserSchema.virtual("fullName").get(function(this: UserBaseDocument) {
  return this.firstName + this.lastName
})
*/

// Methods
/*
UserSchema.methods.getGender = function(this: UserBaseDocument) {
  return this.gender > 0 ? "Male" : "Female"
}
*/

// For model


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

// Document middlewares
/*
UserSchema.pre<UserDocument>("save", function(next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password)
  }
});
// Query middlewares
UserSchema.post<Query<UserDocument, UserDocument>>("findOneAndUpdate", async (doc : any )=> {
  await updateCompanyReference(doc);
});
*/

// Default export
export default model<UserBaseDocument, UserModel>("User", UserSchema)
