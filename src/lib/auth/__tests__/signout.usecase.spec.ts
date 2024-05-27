import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("state account null if signout", async () => {
    authFixture.givenAccountsExists([{
      id: '1',
      email: "test@test.fr",
      password: "password"
    }])

    authFixture.givenAccountAlreadyAuthenticatedAs({id: '1', email: "test@test.fr"})

    await authFixture.whenSignout()

    authFixture.thenAuthStateShouldBe({
      account: null,
      loading: false
    })
  })
})