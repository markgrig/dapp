import { configureStore, combineReducers } from '@reduxjs/toolkit'
import web3ProviderReducer from './redusers/web3Provider'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
    web3Provider: web3ProviderReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>