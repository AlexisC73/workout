import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("should populate auth state if authenticated", async () => {
    authFixture.givenAccountsExists([{
      id: '1',
      email: "test@test.fr",
      password: "password"
    }])

    authFixture.givenAccountAuthenticatedAs({email: "test@test.fr"})

    await authFixture.whenGetMe()

    authFixture.thenAuthStateShouldBe({
      account: {
        id: '1',
        email: "test@test.fr",
      },
      loading: false
    })
  })

  test("should not populate auth state if not authenticated", async () => {
    authFixture.givenAccountsExists([{id: '1', email: "test@test.fr", password: "password"}])

    await authFixture.whenGetMe()

    authFixture.thenAuthStateShouldBe({
      account: null,
      loading: false
    })
  })
})