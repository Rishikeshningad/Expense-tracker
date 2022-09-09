import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
    expense: [],
    totalexpense: 0,
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        expense(state, action){
            console.log('action', action.payload);
            state.expense = [...action.payload];
            console.log( [...action.payload]);
        },
        addingExpense(state, action){
            state.expense = [...state.expense, action.payload];
        },
        totalExpense(state, action){
            state.totalexpense = state.totalexpense + +action.payload;
        },
        afterDeleteExpense(state, action){
            state.totalexpense = state.totalexpense - +action.payload;
        },
    },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer; 