import { createAppAsyncThunk } from "../../create-app-thunk";

export const getMeThunk = createAppAsyncThunk("auth/getMe", async (_, {extra: { userRepository }}) => {
  const user = await userRepository.getMe()
  if(user._tag === "Left") {
    throw user.left
  }
  return user.right
})