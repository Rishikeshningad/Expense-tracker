import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expenseReducer";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { expense: expenseReducer, auth: authReducer, theme: themeReducer, ui: uiSlice}
});

export default store;