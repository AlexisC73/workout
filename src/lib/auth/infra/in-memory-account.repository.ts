import { CredentialError } from "../errors";
import { Account } from "../model/account";
import { AccountRepository } from "../model/account.repository";
import * as E from "fp-ts/Either";

export class InMemoryAccountRepository implements AccountRepository {
  accounts: Account[] = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!) : []
  authenticatedAccount: Omit<Account, "password"> | null = localStorage.getItem("authenticatedAccount") ? JSON.parse(localStorage.getItem("authenticatedAccount")!) : null

  async signin(payload: {email: string, password: string}) {
    const account = this.accounts.find(a => a.email === payload.email && a.password === payload.password)
    if(!account) {
      return E.left(new CredentialError("invalid credentials"))
    }
    this.authenticatedAccount = {id: account.id, email: account.email}
    localStorage.setItem("authenticatedAccount", JSON.stringify(this.authenticatedAccount))
    return E.right({ id: account.id, email: account.email })
  }

  async getMe() {
    if(!this.authenticatedAccount) {
      return E.left(new CredentialError("unauthenticated"))
    }
    return E.right({ id: this.authenticatedAccount.id, email: this.authenticatedAccount.email })
  }

  async signout() {
    if(!this.authenticatedAccount) {
      return E.left(new CredentialError("unauthenticated"))
    }
    this.authenticatedAccount = null
    localStorage.removeItem("authenticatedAccount")
    return E.right(undefined)
  }

  async register(payload: Account) {
    if(this.authenticatedAccount) {
      return E.left(new CredentialError("already authenticated"))
    }
    if(this.accounts.find(account => account.email === payload.email)) {
      return E.left(new CredentialError("email already exists"))
    }
    this.accounts = [...this.accounts, payload]
    localStorage.setItem("users", JSON.stringify(this.accounts))
    return E.right(undefined)
  }
}