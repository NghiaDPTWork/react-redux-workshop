import type { Expense } from '../types/expense'

// CÁCH LÀM & GIẢI THÍCH FLOW:
// - Reducer này quản lý các hành động liên quan đến mảng expenses.
// - Nhận vào trạng thái hiện tại (state) và hành động (action), trả về trạng thái mới.
// - Các action hỗ trợ:
//   1. `ADD_EXPENSE`: Tạo một expense mới bằng cách sao chép payload, tạo UUID tự động và append vào mảng cũ.
//   2. `DELETE_EXPENSE`: Lọc bỏ expense có id trùng với payload.
export type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: Omit<Expense, 'id'> }
  | { type: 'DELETE_EXPENSE'; payload: string }

export function expensesReducer(state: Expense[], action: ExpenseAction): Expense[] {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, { ...action.payload, id: crypto.randomUUID() }]
    case 'DELETE_EXPENSE':
      return state.filter(e => e.id !== action.payload)
    default:
      return state
  }
}
