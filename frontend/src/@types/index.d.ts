import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    background: string
    bgNote: string
    bgNoteHover: string
    borderChecked: string
    checked: string
    perfilBg: string
    perfilBgList: string
    perfilText: string
    primary: string
    shadow: string
    text: string
    title: string
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