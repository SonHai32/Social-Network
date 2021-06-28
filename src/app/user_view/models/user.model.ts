export interface User{
  id: string,
  username: string,
  birthdate: string,
  phone?: string,
  email: string,
  posts?: [],
  friends?: [],
  messages?: [],
}
