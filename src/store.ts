import { Action, configureStore, Middleware } from "@reduxjs/toolkit";
import { reducer as raceReducer } from "./store/raceState";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
// @ts-ignore
// import untypedMiddleware from 'untyped-middleware'
// import rootReducer from './rootReducer'

export const store = configureStore({
  reducer: {
    raceState: raceReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend
      // correctly typed middlewares can just be used
      // additionalMiddleware,
      // you can also type middlewares manually
      // untypedMiddleware as Middleware<
      //   (action: Action<'specialAction'>) => number,
      //   RootState
      // >
      ()
      // prepend and concat calls can be chained
      .concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
