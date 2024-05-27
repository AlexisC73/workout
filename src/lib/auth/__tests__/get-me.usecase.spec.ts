import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("should populate auth state if user authenticated", async () => {
    authFixture.givenUsersExists([{
      id: '1',
      email: "test@test.fr",
      password: "password"
    }])

    authFixture.givenUserAuthenticatedAs({email: "test@test.fr"})

    await authFixture.whenGetMe()

    authFixture.thenAuthStateShouldBe({
      account: {
        id: '1',
        email: "test@test.fr",
      },
      loading: false
    })
  })

  test("should not populate auth state if user not authenticated", async () => {
    authFixture.givenUsersExists([{id: '1', email: "test@test.fr", password: "password"}])

    await authFixture.whenGetMe()

    authFixture.thenAuthStateShouldBe({
      account: null,
      loading: false
    })
  })
})