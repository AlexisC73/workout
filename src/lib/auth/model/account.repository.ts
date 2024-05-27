import { AccountError, CredentialError } from "../errors";
import { Account } from "./account";
import * as E from "fp-ts/Either";

export interface AccountRepository {
  signin: (payload: {email: string, password: string}) => Promise<E.Either<CredentialError, Omit<Account, "password">>>
  getMe: () => Promise<E.Either<CredentialError, Omit<Account, "password">>>
  signout: () => Promise<E.Either<CredentialError, void>>
  register: (payload: Account) => Promise<E.Either<AccountError | CredentialError, void>>
}