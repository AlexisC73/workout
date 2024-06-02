import { AvatarRepository } from "../model/avatar.repository"

export class InMemoryAvatarRepository implements AvatarRepository {
  async updateAvatar({ avatar }: { avatar: string }): Promise<string> {
    return avatar
  }
}