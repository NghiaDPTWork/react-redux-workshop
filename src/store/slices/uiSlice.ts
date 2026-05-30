import { createSlice } from '@reduxjs/toolkit'

export interface UiState {
  loading: boolean
  modalOpen: boolean
}

const initialState: UiState = {
  loading: false,
  modalOpen: false,
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Slide này chịu trách nhiệm quản lý trạng thái hiển thị giao diện người dùng bao gồm trạng thái tải dữ liệu và trạng thái đóng mở của modal.
// Bằng cách sử dụng phương thức createSlice của redux-toolkit ta tự động phát sinh các action setLoading và setModalOpen mà không cần tự định nghĩa thủ công.
// Các reducer tương ứng sẽ thay đổi trực tiếp thuộc tính loading và modalOpen của trạng thái giao diện giúp đơn giản hóa luồng hoạt động UI.
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload
    },
    setModalOpen(state, action: { payload: boolean }) {
      state.modalOpen = action.payload
    },
  },
})

export const { setLoading, setModalOpen } = uiSlice.actions
export default uiSlice.reducer
