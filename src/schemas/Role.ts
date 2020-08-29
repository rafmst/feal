import { Schema, model, Document } from 'mongoose'

interface RoleInterface extends Document {
  title: string
  level: number
}

const RoleSchema = new Schema(
  {
    title: String,
    level: Number
  },
  {
    timestamps: false
  }
)

export default model<RoleInterface>('Role', RoleSchema)
