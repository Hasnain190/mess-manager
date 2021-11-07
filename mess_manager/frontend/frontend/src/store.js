// store redux
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
 
  
    
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    mess: {
        list: [],
        isLoading: false,
        isLoaded: false,
        isError: false,
        error: null
    },
    user: {
        list: [],
        isLoading: false,  
     }
    
    }

    const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

    )

export default store
