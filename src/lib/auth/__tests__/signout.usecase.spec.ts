import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("state user null if user signout", async () => {
    authFixture.givenUsersExists([{
      id: '1',
      email: "test@test.fr",
      password: "password"
    }])

    authFixture.givenUserAlreadyAuthenticatedAs({id: '1', email: "test@test.fr"})

    await authFixture.whenSignout()

    authFixture.thenAuthStateShouldBe({
      user: null,
      loading: false
    })
  })
})