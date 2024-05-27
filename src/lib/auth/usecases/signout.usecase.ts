import { createAppAsyncThunk } from "../../create-app-thunk";

export const signoutThunk = createAppAsyncThunk("auth/signout", async (_, {extra: { accountRepository }}) => {
  const account = await accountRepository.signout()
  if(account._tag === "Left") {
    throw account.left
  }
  return Promise.resolve()
})