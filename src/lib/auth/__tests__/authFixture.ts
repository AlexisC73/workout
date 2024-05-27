import { expect } from "vitest"
import { createStore } from "../../create-store"
import { AuthState } from "../authReducer"
import { signinThunk } from "../usecases/signin.usecase"
import { InMemoryAccountRepository } from "../infra/in-memory-account.repository"
import { Account } from "../model/account"
import { getMeThunk } from "../usecases/get-me.usecase"
import { signoutThunk } from "../usecases/signout.usecase"
import { registerThunk } from "../usecases/register.usecase"

export const createAuthFixture = () => {
  const accountRepository = new InMemoryAccountRepository()

  let store = createStore({ accountRepository }, {})

  return {
    givenUsersExists: (accounts: Account[]) => {
      accountRepository.accounts = accounts
    },
    givenNoUserExists: () => {
      accountRepository.accounts = []
    },
    givenUserAuthenticatedAs: (account: {email: string}) => {
      const repoUser = accountRepository.accounts.find(a => a.email === account.email)!
      accountRepository.authenticatedAccount = {email: repoUser.email, id: repoUser.id}
    },
    givenUserAlreadyAuthenticatedAs: (account: {id: string, email: string}) => {
      accountRepository.authenticatedAccount = {email: account.email, id: account.id}
      store = createStore({accountRepository}, {auth: {account: {id: account.id, email: account.email}, loading: false}})
    },
    whenUserSignIn: async (credentials: {email: string, password: string}) => {
      await store.dispatch(signinThunk(credentials))
    },
    whenGetMe: async () => {
      await store.dispatch(getMeThunk())
    },
    whenSignout: async () => {
      await store.dispatch(signoutThunk())
    },
    whenUserRegister: async (account: Account) => {
      await store.dispatch(registerThunk(account))
    },
    thenAuthStateShouldBe: (auth: AuthState) => {
      expect(store.getState().auth).toEqual(auth)
    },
    thenAccountShouldExist: (expectedAccount: Account) => {
      const fundAccount = accountRepository.accounts.find(a => a.id === expectedAccount.id)
      expect(fundAccount).toEqual(expectedAccount)
    }
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>