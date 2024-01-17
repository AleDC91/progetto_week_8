import { createStore } from 'redux';
import storeReducer from '../reducers'


const initialState = {}

export const store = createStore(storeReducer, initialState) 