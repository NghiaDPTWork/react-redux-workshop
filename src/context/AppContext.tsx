import { createContext, useReducer, useState, useEffect, type ReactNode } from 'react'
import type { Expense } from '../types/expense'
import { expensesReducer, type ExpenseAction } from '../reducers/expensesReducer'
import { STORAGE_KEY } from '../constants'

export interface AppContextValue {
  expenses: Expense[]
  dispatchExpenses: React.Dispatch<ExpenseAction>
  currency: 'USD' | 'VND'
  setCurrency: (c: 'USD' | 'VND') => void
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  currencySymbol: string
}

export const AppContext = createContext<AppContextValue | null>(null)

// TODO: in 09-custom-hooks, extract a useAppContext() custom hook with a null guard

// CÁCH LÀM & GIẢI THÍCH FLOW:
// - Ở nhánh này, thay vì quản lý mảng expenses bằng useState trong App.tsx, ta chuyển hẳn vào
//   quản lý bằng useReducer kết hợp với useContext trong AppProvider.
// -useReducer sử dụng expensesReducer và hàm khởi tạo lazy để lấy dữ liệu cũ từ localStorage.
// - dispatchExpenses được truyền xuống các component con thông qua Context.
// - Nhờ đó, bất kỳ component con nào cũng có thể thêm/xóa chi tiêu bằng cách gửi action thông qua dispatchExpenses.
export function AppProvider({ children }: { children: ReactNode }) {
  const [expenses, dispatchExpenses] = useReducer(
    expensesReducer,
    null,
    () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Expense[]) : []
    },
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const [currency, setCurrency] = useState<'USD' | 'VND'>('USD')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const currencySymbol = currency === 'USD' ? '$' : '₫'

  return (
    <AppContext.Provider value={{ expenses, dispatchExpenses, currency, setCurrency, theme, setTheme, currencySymbol }}>
      {children}
    </AppContext.Provider>
  )
}
