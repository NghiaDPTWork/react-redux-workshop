import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FiltersState {
  category: string | null
}

const initialState: FiltersState = {
  category: null,
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Nhằm tinh giản mã nguồn và loại bỏ sự rườm rà của việc định nghĩa thủ công actionTypes actions và reducer ta chuyển sang dùng createSlice của thư viện redux-toolkit.
// Hàm createSlice tự động tạo ra cả action creator và reducer tương ứng dựa trên đối tượng reducers được định nghĩa.
// State được viết dưới dạng đột biến trực tiếp nhờ thư viện immer tích hợp sẵn nhưng vẫn đảm bảo tính bất biến (immutability) ở đầu ra.
// Slice này quản lý trạng thái lọc theo danh mục của chi tiêu chứa hàm setFilter để cập nhật danh mục hiện tại và clearFilters để xóa bộ lọc.
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
    clearFilters(state) {
      state.category = null
    },
  },
})

export const { setFilter, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
