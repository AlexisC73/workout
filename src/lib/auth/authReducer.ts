import { createReducer } from "@reduxjs/toolkit";
import { signinThunk } from "./usecases/signin.usecase";
import { getMeThunk } from "./usecases/get-me.usecase";
import { signoutThunk } from "./usecases/signout.usecase";
import { RootState } from "../create-store";
import { Account } from "../account/model/account";
import { updateAvatarThunk } from "../account/usecases/update-avatar.usecase";

export interface AuthState {
  account: Omit<Account, "password"> | null
  loading: boolean
}

const authState: AuthState = {
  account: null,
  loading: false
}

export const authReducer = createReducer(authState, (builder) => {
  builder.addCase(signinThunk.fulfilled, (state, action) => {
    state.account = {email: action.payload.email, id: action.payload.id, avatarUrl: action.payload.avatarUrl}
    state.loading = false
  }).addCase(signinThunk.pending, (state) => {
    state.loading = true
  }).addCase(signinThunk.rejected, (state) => {
    state.loading = false
    state.account = null
  }).addCase(getMeThunk.fulfilled, (state, action) => {
    state.account = {email: action.payload.email, id: action.payload.id, avatarUrl: action.payload.avatarUrl}
    state.loading = false
  }).addCase(getMeThunk.pending, (state) => {
    state.loading = true
  }).addCase(getMeThunk.rejected, (state) => {
    state.loading = false
    state.account = null
  }).addCase(signoutThunk.fulfilled, (state) => {
    state.account = null
    state.loading = false
  }).addCase(signoutThunk.pending, (state) => {
    state.loading = true
  }).addCase(signoutThunk.rejected, (state) => {
    state.loading = false
  }).addCase(updateAvatarThunk.fulfilled, (state, action) => {
    if(!state.account) return
    state.account = {...state.account, avatarUrl: action.payload}
  })
})

export const getAuthUser = (state: RootState) => state.auth.account