import {describe, test, beforeEach} from "vitest"
import { AuthFixture, createAuthFixture } from "./authFixture"

describe("signin usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })
  
  test("should sign in account", async () => {
    authFixture.givenAccountsExists([{ id: "1", email: "test@test.fr", password: "password"}])

    await authFixture.whenSignIn({ email: "test@test.fr", password: "password" })

    authFixture.thenAuthStateShouldBe({account: { id: "1", email: "test@test.fr" }, loading: false})
  })

  test("if account does not exist should not sign in", async () => {
    authFixture.givenNoAccountExists()

    await authFixture.whenSignIn({ email: "test@test.fr", password: "password" })

    authFixture.thenAuthStateShouldBe({account: null, loading: false})
  })
})