import { Account } from "../model/account";

export const accountBuilder = ({id = "1", email = "test@test.fr", password = "test-pass"}: Partial<Account> = {}) => {
  const props = {id, email, password}

  return {
    ...props,
    withId: (id: string) => accountBuilder({...props, id}),
    withEmail: (email: string) => accountBuilder({...props, email}),
    withPassword: (password: string) => accountBuilder({...props, password}),
    build: () => props as Account
  }
}