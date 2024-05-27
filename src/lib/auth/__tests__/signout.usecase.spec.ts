import { beforeEach, describe, test } from "vitest";
import { AuthFixture, createAuthFixture } from "./authFixture";
import { accountBuilder } from "./accountBuilder";

describe("get me usecase", () => {
  let authFixture: AuthFixture

  beforeEach(() => {
    authFixture = createAuthFixture()
  })

  test("state account null if signout", async () => {
    const existingAccount = accountBuilder().withId("1").withEmail("test@test.fr").withPassword("password").build()

    authFixture.givenAccountsExists([existingAccount])

    authFixture.givenAccountAlreadyAuthenticatedAs({id: '1', email: "test@test.fr"})

    await authFixture.whenSignout()

    authFixture.thenAuthStateShouldBe({
      account: null,
      loading: false
    })
  })
})