import {describe, test, beforeEach} from "vitest"
import { AuthFixture, createAuthFixture } from "./authFixture"
import { accountBuilder } from "./accountBuilder"

describe("signin usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })
  
  test("should sign in account", async () => {
    const existingAccount = accountBuilder().withId("1").withEmail("test@test.fr").withPassword("password").withAvatarUrl(null).build()

    authFixture.givenAccountsExists([existingAccount])

    await authFixture.whenSignIn({ email: "test@test.fr", password: "password" })

    authFixture.thenAuthStateShouldBe({account: { id: "1", email: "test@test.fr", avatarUrl: null }, loading: false})
  })

  test("if account does not exist should not sign in", async () => {
    authFixture.givenNoAccountExists()

    await authFixture.whenSignIn({ email: "test@test.fr", password: "password" })

    authFixture.thenAuthStateShouldBe({account: null, loading: false})
  })
})