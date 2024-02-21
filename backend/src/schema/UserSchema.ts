export interface UserData {
    id?: number
    username?: string
    email: string
    password: string
}

export interface User {
    id: number
    username: string
    email: string
    password: string
    insertId?: number
  }