import { createAppAsyncThunk } from "../../create-app-thunk";

export const getMeThunk = createAppAsyncThunk("auth/getMe", async (_, {extra: { accountRepository }}) => {
  const account = await accountRepository.getMe()
  if(account._tag === "Left") {
    throw account.left
  }
  return account.right
})