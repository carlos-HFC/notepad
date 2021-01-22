import { User } from "src/user/user.model"
import 'express'

export interface UpdateUser extends User {
  oldPass?: string
  confirmPass?: string
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