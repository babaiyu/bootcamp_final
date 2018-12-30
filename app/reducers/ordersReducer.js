/* Reducer berfungsi untuk memanggil function di action dengan dimana ini logika yang diterapkan */

const initialState = {
    results: [],
    isLoading: false,
    isError: false
}

function ordersReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_ORDERS_PENDING":
            return { ...state, isLoading: true }
        case "GET_ORDERS_FULFILLED":
            return { ...state, isLoading: false, results: action.payload.data }
        case "GET_ORDERS_REJECTED":
            return { ...state, isLoading: false, isError: true }

        default:
            return state
    }
}

export default ordersReducer