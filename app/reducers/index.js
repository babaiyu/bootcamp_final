import { combineReducers } from 'redux'
import videoReducers from './videoReducers'
import popularReducers from './popularReducers'
import categoryReducers from './categoryReducers'
import episodeReducers from './episodeReducers'
import userReducers from './userReducers'
import favoriteReducers from './favoriteReducers'
import activeReducers from './activeReducers'

import productsReducer from './productsReducer'
import ordersReducer from './ordersReducer'

const reducers = combineReducers({
    
	
	
	productsReducer,
	ordersReducer,
})

export default reducers