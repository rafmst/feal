import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
  name: string
  email: string
  password: string
  role: string
}

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    }
  },
  {
    timestamps: false
  }
)

export default model<UserInterface>('User', UserSchema)
