import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("should add account in account repository", async () => {
    authFixture.givenNoAccountExists()

    await authFixture.whenRegister({id: "1", email: "test@test.fr", password: "password"})

    authFixture.thenAccountShouldExist({
      id: "1",
      email: "test@test.fr",
      password: "password"
    })
  })
})