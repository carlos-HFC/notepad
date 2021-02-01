import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    title: string
    background: string
    text: string
    primary: string
    checked: string
    shadow: string
    borderChecked: string
    perfilBg: string
    perfilBgList: string
    perfilText: string
  }
}

export interface INotes {
  id: number
  userId: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  id: number
  name: string
  email: string
  hash: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}