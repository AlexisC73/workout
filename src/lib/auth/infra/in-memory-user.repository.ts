import { CredentialError } from "../errors";
import { User } from "../model/user";
import { UserRepository } from "../model/user.repository";
import * as E from "fp-ts/Either";

export class InMemoryUserRepository implements UserRepository {
  users: User[] = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!) : []
  authenticatedUser: Omit<User, "password"> | null = localStorage.getItem("authenticatedUser") ? JSON.parse(localStorage.getItem("authenticatedUser")!) : null

  async signin(payload: {email: string, password: string}) {
    const user = this.users.find(user => user.email === payload.email && user.password === payload.password)
    if(!user) {
      return E.left(new CredentialError("invalid credentials"))
    }
    this.authenticatedUser = {id: user.id, email: user.email}
    localStorage.setItem("authenticatedUser", JSON.stringify(this.authenticatedUser))
    return E.right({ id: user.id, email: user.email })
  }

  async getMe() {
    if(!this.authenticatedUser) {
      return E.left(new CredentialError("unauthenticated"))
    }
    return E.right({ id: this.authenticatedUser.id, email: this.authenticatedUser.email })
  }

  async signout() {
    if(!this.authenticatedUser) {
      return E.left(new CredentialError("unauthenticated"))
    }
    this.authenticatedUser = null
    localStorage.removeItem("authenticatedUser")
    return E.right(undefined)
  }

  async register(payload: User) {
    if(this.authenticatedUser) {
      return E.left(new CredentialError("already authenticated"))
    }
    if(this.users.find(user => user.email === payload.email)) {
      return E.left(new CredentialError("email already exists"))
    }
    this.users = [...this.users, payload]
    localStorage.setItem("users", JSON.stringify(this.users))
    return E.right(undefined)
  }
}