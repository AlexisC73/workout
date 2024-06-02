import { createAppAsyncThunk } from "@/lib/create-app-thunk";


export const updateAvatarThunk = createAppAsyncThunk("account/update-avatar", async ({avatar}: {avatar: string}, {extra: {accountRepository, avatarRepository}}) => {
  const avatarLink = await avatarRepository.updateAvatar({avatar})
  await accountRepository.updateAvatatar({ newLink: avatarLink })
  return avatarLink
})