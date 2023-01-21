import { useDispatch, useSelector,TypedUseSelectorHook} from 'react-redux'
import { RootState, AppDispatch } from './store'
// we have created this file to specify types of our useDispatch and useSelector
export const useAppDispatch =()=>useDispatch<AppDispatch>()

// useSelector is a function but we are aliasing it and adding types
export const useAppSelector:TypedUseSelectorHook<RootState> =useSelector