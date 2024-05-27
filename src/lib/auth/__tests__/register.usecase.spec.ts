import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";
import { accountBuilder } from "./accountBuilder";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("should add account in account repository", async () => {
    const registeredAccount = accountBuilder().withId("1").withEmail("test@test.fr").withPassword("password").build()

    authFixture.givenNoAccountExists()

    await authFixture.whenRegister({id: "1", email: "test@test.fr", password: "password"})

    authFixture.thenAccountShouldExist(registeredAccount)
  })
})