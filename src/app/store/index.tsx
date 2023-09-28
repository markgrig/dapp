import { configureStore, combineReducers } from '@reduxjs/toolkit'
import accountAddressReducer from './redusers/accountAddress'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
    accountAddress: accountAddressReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>