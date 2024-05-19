import { createAppAsyncThunk } from "../../create-app-thunk";
import { User } from "../model/user";

export const registerThunk = createAppAsyncThunk("auth/register", async (payload: RegisterPayload, {extra: { userRepository }}) => {
  const signedUser = await userRepository.register(payload)
  if(signedUser._tag === "Left") {
    throw signedUser.left
  }
  return signedUser.right
})

export type RegisterPayload = User
