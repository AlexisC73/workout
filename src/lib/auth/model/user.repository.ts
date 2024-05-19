import { CredentialError } from "../errors";
import { User } from "./user";
import * as E from "fp-ts/Either";

export interface UserRepository {
  signin: (payload: {email: string, password: string}) => Promise<E.Either<CredentialError, Omit<User, "password">>>
  getMe: () => Promise<E.Either<CredentialError, Omit<User, "password">>>
}