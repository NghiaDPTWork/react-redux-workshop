import { SET_FILTER, CLEAR_FILTERS } from './actionTypes'

export function setFilter(category: string) {
  return {
    type: SET_FILTER,
    payload: category,
  } as const
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  } as const
}

export type FilterAction =
  | ReturnType<typeof setFilter>
  | ReturnType<typeof clearFilters>
