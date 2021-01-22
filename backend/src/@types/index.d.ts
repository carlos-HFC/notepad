import { User } from "src/user/user.model"
import 'express'

export interface UpdateUser {
  id?: number
  name?: string
  email?: string
  password?: string
  oldPass?: string
  confirmPass?: string
  deletedAt?: Date | null
}

export interface CreateUser extends User {
  confirmPass: string
}

export interface ILogin {
  email: string
  password: string
}

export interface CreateNote {
  title: string
  description: string
}

declare module 'express' {
  export interface Request {
    user: User
  }
}