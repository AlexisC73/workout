import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";
import { accountBuilder } from "./accountBuilder";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("should populate auth state if authenticated", async () => {
    const existingAccount = accountBuilder().withId("1").withEmail("test@test.fr").withPassword("password").build()

    authFixture.givenAccountsExists([existingAccount])

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
    const existingAccount = accountBuilder().withId("1").withEmail("test@test.fr").withPassword("password").build()

    authFixture.givenAccountsExists([existingAccount])

    await authFixture.whenGetMe()

    authFixture.thenAuthStateShouldBe({
      account: null,
      loading: false
    })
  })
})