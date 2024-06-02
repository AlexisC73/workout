import { beforeEach, describe, test } from "vitest";
import { AccountFixture, createAccountFixture } from "./accountFixture";
import { accountBuilder } from "./accountBuilder";

describe("update avatar usecase", () => {
  let accountFixture: AccountFixture

  beforeEach(() => {
    accountFixture = createAccountFixture()
    
  })
  test("should update avatar", async () => {
    const existingAccount = accountBuilder().withId("1").withEmail("test@email.fr").withPassword("password").withAvatarUrl(null)
    accountFixture.givenAccountExists([existingAccount.build()])
    accountFixture.givenAccountAuthenticatedAs({email: "test@email.fr"})

    await accountFixture.whenUpdateAvatar({avatar: "image.png"})

    accountFixture.thenAccountShouldBeUpdated(existingAccount.withAvatarUrl("image.png").build())
    accountFixture.thenAuthStateShouldBe({account: {id: "1", email: "test@email.fr", avatarUrl: "image.png"}, loading: false})
  })
})