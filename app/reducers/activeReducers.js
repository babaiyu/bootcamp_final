/* Reducer berfungsi untuk memanggil function di action dengan dimana ini logika yang diterapkan */

const initialState = {
    data: 'item',
    isLoading: false,
    isError: false
}

function activeReducers(state = initialState, action) {
    switch (action.type) {

        case "ACTIVE":
            return { ...state, isLoading: true, data: action.payload }

        default:
            return state
    }
}

export default activeReducers