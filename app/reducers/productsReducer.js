/* Reducer berfungsi untuk memanggil function di action dengan dimana ini logika yang diterapkan */

const initialState = {
    results: [],
    isLoading: false,
    isError: false
}

function productsReducers(state = initialState, action) {
    switch (action.type) {

        case "GET_PRODUCTS_PENDING":
            return { ...state, isLoading: true }
        case "GET_PRODUCTS_FULFILLED":
            return { ...state, isLoading: false, results: action.payload.data }
        case "GET_PRODUCTS_REJECTED":
            return { ...state, isLoading: false, isError: true }

        default:
            return state
    }
}

export default productsReducers