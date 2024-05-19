import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("should populate auth state if user authenticated", async () => {
    authFixture.givenNoUserExists()

    await authFixture.whenUserRegister({id: "1", email: "test@test.fr", password: "password"})

    authFixture.thenAccountShouldExist({
      id: "1",
      email: "test@test.fr",
      password: "password"
    })
  })
})