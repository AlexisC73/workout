export interface AvatarRepository {
  updateAvatar({avatar}: {avatar: string}): Promise<string>
}