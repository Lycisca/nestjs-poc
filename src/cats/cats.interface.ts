import { UserInterface } from "../users/users.interface"

interface CatsInterface {
  name: string,
  age: number,
  user(userId: number): { user: UserInterface }
}
