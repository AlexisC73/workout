import { expect } from "vitest"
import { createStore } from "../../create-store"
import { AuthState } from "../authReducer"
import { signinThunk } from "../usecases/signin.usecase"
import { InMemoryUserRepository } from "../infra/in-memory-user.repository"
import { User } from "../model/user"
import { getMeThunk } from "../usecases/get-me.usecase"
import { signoutThunk } from "../usecases/signout.usecase"

export const createAuthFixture = () => {
  const userRepository = new InMemoryUserRepository()

  let store = createStore({ userRepository }, {})

  return {
    givenUsersExists: (users: User[]) => {
      userRepository.users = users
    },
    givenNoUserExists: () => {
      userRepository.users = []
    },
    givenUserAuthenticatedAs: (user: {email: string}) => {
      const repoUser = userRepository.users.find(u => u.email === user.email)!
      userRepository.authenticatedUser = {email: repoUser.email, id: repoUser.id}
    },
    givenUserAlreadyAuthenticatedAs: (user: {id: string, email: string}) => {
      userRepository.authenticatedUser = {email: user.email, id: user.id}
      store = createStore({userRepository}, {auth: {user: {id: user.id, email: user.email}, loading: false}})
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
    thenAuthStateShouldBe: (auth: AuthState) => {
      expect(store.getState().auth).toEqual(auth)
    },
  }
}

export type AuthFixture = ReturnType<typeof createAuthFixture>