import { configureStore, Middleware } from "@reduxjs/toolkit";
import slices from "./slices"; //from index.ts
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { persistStore } from "./middleware/persistStore";

const store = configureStore({
  reducer: slices,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(persistStore as Middleware);
  },
});
export default store;
