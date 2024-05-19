import { createAppAsyncThunk } from "../../create-app-thunk";

export const signoutThunk = createAppAsyncThunk("auth/signout", async (_, {extra: { userRepository }}) => {
  const user = await userRepository.signout()
  if(user._tag === "Left") {
    throw user.left
  }
  return Promise.resolve()
})