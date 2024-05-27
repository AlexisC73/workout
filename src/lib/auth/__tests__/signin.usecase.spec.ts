import {describe, test, beforeEach} from "vitest"
import { AuthFixture, createAuthFixture } from "./authFixture"

describe("signin usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })
  
  test("should sign in user", async () => {
    authFixture.givenUsersExists([{ id: "1", email: "test@test.fr", password: "password"}])

    await authFixture.whenUserSignIn({ email: "test@test.fr", password: "password" })

    authFixture.thenAuthStateShouldBe({account: { id: "1", email: "test@test.fr" }, loading: false})
  })

  test("if user does not exist should not sign in", async () => {
    authFixture.givenNoUserExists()

    await authFixture.whenUserSignIn({ email: "test@test.fr", password: "password" })

    authFixture.thenAuthStateShouldBe({account: null, loading: false})
  })
})