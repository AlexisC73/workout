import { createAppAsyncThunk } from "../../create-app-thunk";

export const signinThunk = createAppAsyncThunk("auth/signin", async (payload: SigninPayload, {extra: { userRepository }}) => {
  const signedUser = await userRepository.signin(payload)
  if(signedUser._tag === "Left") {
    throw signedUser.left
  }
  return signedUser.right
})

export type SigninPayload = {
  email: string
  password: string
}