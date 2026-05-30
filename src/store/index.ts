import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import expensesReducer from './slices/expensesSlice'
import filtersReducer from './slices/filtersSlice'
import uiReducer from './slices/uiSlice'
import { STORAGE_KEY } from '../constants'

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
})

let hydrated = false

store.subscribe(() => {
  const items = store.getState().expenses.items
  if (!hydrated) {
    if (items.length === 0) return
    hydrated = true
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
