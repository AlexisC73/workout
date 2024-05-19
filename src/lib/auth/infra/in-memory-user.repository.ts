import { CredentialError } from "../errors";
import { User } from "../model/user";
import { UserRepository } from "../model/user.repository";
import * as E from "fp-ts/Either";

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  authenticatedUser: Omit<User, "password"> | null = null

  async signin(payload: {email: string, password: string}) {
    const user = this.users.find(user => user.email === payload.email && user.password === payload.password)
    if(!user) {
      return E.left(new CredentialError("invalid credentials"))
    }
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
    return E.right(undefined)
  }
}