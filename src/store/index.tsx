import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./slices/config";
import interviewReducer from "./slices/interview";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    config: configReducer,
    interview: interviewReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
