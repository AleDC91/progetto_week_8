import { createStore } from 'redux';
import storeReducer from '../reducers'


const initialState = {
    homeBackground: "",
    pastSearch: []
}

export const store = createStore(storeReducer, initialState) 