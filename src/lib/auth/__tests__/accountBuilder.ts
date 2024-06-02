import { Account } from "../../account/model/account";

export const accountBuilder = ({id = "1", email = "test@test.fr", password = "test-pass", avatarUrl = null}: Partial<Account> = {}) => {
  const props = {id, email, password, avatarUrl}

  return {
    ...props,
    withId: (id: string) => accountBuilder({...props, id}),
    withEmail: (email: string) => accountBuilder({...props, email}),
    withPassword: (password: string) => accountBuilder({...props, password}),
    withAvatarUrl: (avatarUrl: string | null) => accountBuilder({...props, avatarUrl}),
    build: () => props as Account
  }
}