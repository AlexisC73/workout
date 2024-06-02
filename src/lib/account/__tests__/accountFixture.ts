import { expect } from "vitest"
import { createStore, RootState } from "../../create-store"
import { InMemoryAccountRepository } from "../../account/infra/in-memory-account.repository"
import { Account } from "../../account/model/account"
import { InMemoryAvatarRepository } from "@/lib/account/infra/in-memory-avatar.repository"
import { updateAvatarThunk } from "../usecases/update-avatar.usecase"
import { AuthState } from "@/lib/auth/authReducer"

export const createAccountFixture = ({accountRepository = new InMemoryAccountRepository(), avatarRepository = new InMemoryAvatarRepository()} : Partial<{avatarRepository: InMemoryAvatarRepository, accountRepository: InMemoryAccountRepository}> = {}, preloadedState: Partial<RootState> = {}) => {

  let store = createStore({ accountRepository, avatarRepository }, preloadedState)

  return {
    givenAccountExists: (accounts: Account[]) => {
      accountRepository.accounts = accounts
    },
    givenAccountAuthenticatedAs: (account: {email: string}) => {
      const repoAccount = accountRepository.accounts.find(a => a.email === account.email)!
      accountRepository.authenticatedAccount = {email: repoAccount.email, id: repoAccount.id, avatarUrl: repoAccount.avatarUrl}
      store = createStore({accountRepository, avatarRepository}, {auth: {account: {id: repoAccount.id, email: repoAccount.email, avatarUrl: repoAccount.avatarUrl}, loading: false}})
    },
    whenUpdateAvatar: async ({avatar}: {avatar: string}) => {
      await store.dispatch(updateAvatarThunk({avatar}))
    },
    thenAccountShouldBeUpdated: (expectedAccount: Account) => {
      const foundAccount = accountRepository.accounts.find(a => a.id === expectedAccount.id)
      expect(foundAccount).toEqual(expectedAccount)
    },
    thenAuthStateShouldBe: (expectedAuth: AuthState) => {
      expect(store.getState().auth).toEqual(expectedAuth)
    }
  }
}

export type AccountFixture = ReturnType<typeof createAccountFixture>