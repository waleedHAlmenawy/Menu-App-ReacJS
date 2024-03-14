import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/categoriesSlice'

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
})