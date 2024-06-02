import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import { rootReducer } from "./root-reducer"
import { AccountRepository } from "./account/model/account.repository"
import { AvatarRepository } from "./account/model/avatar.repository"

export interface Dependencies {
  accountRepository: AccountRepository
  avatarRepository: AvatarRepository
}

export const createStore = (dependencies: Dependencies, preloadedState: Partial<RootState>) => {
  
  const store =  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: dependencies
      }
    }),
    preloadedState
  })

  return {...store}
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>
