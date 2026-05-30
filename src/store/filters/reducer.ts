import { SET_FILTER, CLEAR_FILTERS } from './actionTypes'
import type { FilterAction } from './actions'

export interface FiltersState {
  category: string | null
}

const initialFiltersState: FiltersState = {
  category: null,
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Reducer lọc chi tiêu chịu trách nhiệm quản lý danh mục lọc đang được chọn trong ứng dụng.
// Nhận trạng thái hiện tại (state) và hành động (action) làm tham số để trả về trạng thái mới chứa danh mục đã chọn.
// Nếu nhận hành động SET_FILTER thì reducer cập nhật thuộc tính category bằng giá trị payload nhận được.
// Nếu nhận hành động CLEAR_FILTERS thì thuộc tính category được đưa về giá trị null mặc định để hiển thị toàn bộ chi tiêu.
// Cuối cùng nếu không khớp bất kỳ hành động nào reducer trả về trạng thái hiện tại của nó.
export function filtersReducer(
  state: FiltersState = initialFiltersState,
  action: FilterAction,
): FiltersState {
  switch (action.type) {
    case SET_FILTER:
      return {
        category: action.payload,
      }
    case CLEAR_FILTERS:
      return {
        category: null,
      }
    default:
      return state
  }
}
