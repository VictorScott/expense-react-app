import {
    LIST_EXPENSE_STARTED, LIST_EXPENSE_SUCCESS, LIST_EXPENSE_FAILURE,
    ADD_EXPENSE_STARTED, ADD_EXPENSE_SUCCESS, ADD_EXPENSE_FAILURE,
    DELETE_EXPENSE_STARTED, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAILURE
} from "../types/expense";
// define initial state of user
const initialState = {
    data: null,
    loading: false,
    error: null
}
export default function expenseReducer (state = initialState, action) {
    switch (action.type) {
        case LIST_EXPENSE_STARTED:
            return {
                ...state,
                loading: true
            }
        case LIST_EXPENSE_SUCCESS:
            const { data } = action.payload;
            return {
                ...state,
                data,
                loading: false
            }
        case LIST_EXPENSE_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                error
            }
        case ADD_EXPENSE_STARTED:
            return {
                ...state,
                loading: true
            }
        case ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case ADD_EXPENSE_FAILURE:
            const { expenseError } = action.payload;
            return {
                ...state,
                expenseError
            }
        case DELETE_EXPENSE_STARTED:
            return {
                ...state,
                loading: true
            }
        case DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                data: state.data.filter(expense => expense.id !==
                    action.payload.data),
                loading: false
            }
        case DELETE_EXPENSE_FAILURE:
            const { deleteError } = action.payload;
            return {
                ...state,
                deleteError
            }
        default:
            return state
    }
}