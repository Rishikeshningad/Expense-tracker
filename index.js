import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expenseReducer";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";

const store = configureStore({
    reducer: { expense: expenseReducer, auth: authReducer, theme: themeReducer}
});

export default store;