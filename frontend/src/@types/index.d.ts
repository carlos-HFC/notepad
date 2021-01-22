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
  }
}

export interface Notes {
  id: number
  userId: number
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}