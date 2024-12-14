import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import postsReducer from './slice/postSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCounterReducer = persistReducer(persistConfig, counterReducer);
const persistedPostsReducer = persistReducer(persistConfig, postsReducer);

export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    posts: persistedPostsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
