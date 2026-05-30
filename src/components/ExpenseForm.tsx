import { useReducer } from 'react'
import { CATEGORIES } from '../constants'
import type { Expense } from '../types/expense'

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void
}

interface FormState {
  description: string
  amount: string
  category: string
}

const initialFormState: FormState = {
  description: '',
  amount: '',
  category: '',
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET' }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      }
    case 'RESET':
      return initialFormState
    default:
      return state
  }
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Để quản lý form có nhiều trường thông tin như mô tả số tiền và danh mục thay vì sử dụng nhiều useState độc lập gây rời rạc ta sử dụng useReducer để gộp tất cả thành một đối tượng duy nhất.
// Đầu tiên ta định nghĩa cấu trúc FormState và các hành động FormAction có thể thay đổi trạng thái bao gồm việc cập nhật một trường dữ liệu hoặc reset lại toàn bộ form.
// Hàm formReducer chịu trách nhiệm tính toán và trả về trạng thái form mới dựa trên hành động nhận được.
// Khi sử dụng trong component useReducer sẽ trả về trạng thái hiện tại và hàm dispatch để gửi các hành động thay đổi giúp quản lý luồng dữ liệu của form một cách tập trung và nhất quán.
function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialFormState)
  const { description, amount, category } = state

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description || !amount || !category) return
    onAddExpense({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
    })
    dispatch({ type: 'RESET' })
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <label>
        Name
        <input
          value={description}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
          placeholder="e.g. Lunch"
          required
        />
      </label>
      <label>
        Amount ($)
        <input
          value={amount}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'amount', value: e.target.value })}
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>
      <label>
        Category
        <select value={category} onChange={e => dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value })} required>
          <option value="">Select category</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
