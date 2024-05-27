import { createAppAsyncThunk } from "../../create-app-thunk";

export const signinThunk = createAppAsyncThunk("auth/signin", async (payload: SigninPayload, {extra: { accountRepository }}) => {
  const signedAccount = await accountRepository.signin(payload)
  if(signedAccount._tag === "Left") {
    throw signedAccount.left
  }
  return signedAccount.right
})

export type SigninPayload = {
  email: string
  password: string
}