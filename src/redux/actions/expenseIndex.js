import {
    LIST_EXPENSE_STARTED, LIST_EXPENSE_SUCCESS, LIST_EXPENSE_FAILURE,
    ADD_EXPENSE_STARTED, ADD_EXPENSE_SUCCESS, ADD_EXPENSE_FAILURE,
    DELETE_EXPENSE_STARTED, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAILURE,
} from "../types/expense";
export const getExpenseListStarted = () => {
    return {
        type: LIST_EXPENSE_STARTED
    }
}
export const getExpenseListSuccess = data => {
    return {
        type: LIST_EXPENSE_SUCCESS,
        payload: {
            data
        }
    }
}
export const getExpenseListFailure = error => {
    return {
        type: LIST_EXPENSE_FAILURE,
        payload: {
            error
        }
    }
}
export const addExpenseStarted = () => {
    return {
        type: ADD_EXPENSE_STARTED
    }
}
export const addExpenseSuccess = data => {
    return {
        type: ADD_EXPENSE_SUCCESS,
        payload: {
            data
        }
    }
}
export const addExpenseFailure = error => {
    return {
        type: ADD_EXPENSE_FAILURE,
        payload: {
            error
        }
    }
}
export const deleteExpenseStarted = () => {
    return {
        type: DELETE_EXPENSE_STARTED
    }
}
export const deleteExpenseSuccess = data => {
    return {
        type: DELETE_EXPENSE_SUCCESS,
        payload: {
            data
        }
    }
}
export const deleteExpenseFailure = error => {
    return {
        type: DELETE_EXPENSE_FAILURE,
        payload: {
            error
        }
    }
}