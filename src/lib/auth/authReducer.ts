import { createReducer } from "@reduxjs/toolkit";
import { signinThunk } from "./usecases/signin.usecase";
import { getMeThunk } from "./usecases/get-me.usecase";

export interface AuthState {
  user: { id: string, email: string } | null
  loading: boolean
}

const authState: AuthState = {
  user: null,
  loading: false
}

export const authReducer = createReducer(authState, (builder) => {
  builder.addCase(signinThunk.fulfilled, (state, action) => {
    state.user = {email: action.payload.email, id: action.payload.id}
    state.loading = false
  }).addCase(signinThunk.pending, (state) => {
    state.loading = true
  }).addCase(signinThunk.rejected, (state) => {
    state.loading = false
    state.user = null
  }).addCase(getMeThunk.fulfilled, (state, action) => {
    state.user = {email: action.payload.email, id: action.payload.id}
    state.loading = false
  }).addCase(getMeThunk.pending, (state) => {
    state.loading = true
  }).addCase(getMeThunk.rejected, (state) => {
    state.loading = false
    state.user = null
  })
})