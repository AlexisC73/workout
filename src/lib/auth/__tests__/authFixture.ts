import { expect } from "vitest"
import { createStore, RootState } from "../../create-store"
import { AuthState } from "../authReducer"
import { signinThunk } from "../usecases/signin.usecase"
import { InMemoryAccountRepository } from "../../account/infra/in-memory-account.repository"
import { Account } from "../../account/model/account"
import { getMeThunk } from "../usecases/get-me.usecase"
import { signoutThunk } from "../usecases/signout.usecase"
import { registerThunk } from "../usecases/register.usecase"
import { InMemoryAvatarRepository } from "@/lib/account/infra/in-memory-avatar.repository"

export const createAuthFixture = ({accountRepository = new InMemoryAccountRepository(), avatarRepository = new InMemoryAvatarRepository()} : Partial<{avatarRepository: InMemoryAvatarRepository, accountRepository: InMemoryAccountRepository}> = {}, preloadedState: Partial<RootState> = {}) => {

  let store = createStore({ accountRepository, avatarRepository }, preloadedState)

  return {
    givenAccountsExists: (accounts: Account[]) => {
      accountRepository.accounts = accounts
    },
    givenNoAccountExists: () => {
      accountRepository.accounts = []
    },
    givenAccountAuthenticatedAs: (account: {email: string}) => {
      const repoAccount = accountRepository.accounts.find(a => a.email === account.email)!
      accountRepository.authenticatedAccount = {email: repoAccount.email, id: repoAccount.id, avatarUrl: repoAccount.avatarUrl}
    },
    givenAccountAlreadyAuthenticatedAs: (account: {id: string, email: string, avatarUrl: string | null}) => {
      accountRepository.authenticatedAccount = {email: account.email, id: account.id, avatarUrl: account.avatarUrl}
      store = createStore({accountRepository, avatarRepository}, {auth: {account: {id: account.id, email: account.email, avatarUrl: account.avatarUrl}, loading: false}})
    },
    whenSignIn: async (credentials: {email: string, password: string}) => {
      await store.dispatch(signinThunk(credentials))
    },
    whenGetMe: async () => {
      await store.dispatch(getMeThunk())
    },
    whenSignout: async () => {
      await store.dispatch(signoutThunk())
    },
    whenRegister: async (account: Omit<Account, "avatarUrl">) => {
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