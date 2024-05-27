import { createAppAsyncThunk } from "../../create-app-thunk";
import { Account } from "../model/account";

export const registerThunk = createAppAsyncThunk("auth/register", async (payload: RegisterPayload, {extra: { accountRepository }}) => {
  const signedAccount = await accountRepository.register(payload)
  if(signedAccount._tag === "Left") {
    throw signedAccount.left
  }
  return signedAccount.right
})

export type RegisterPayload = Account
