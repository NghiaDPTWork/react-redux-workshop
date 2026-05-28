import { useState, useEffect, useRef } from 'react'
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')

  // Flow làm & Hiểu:
  // 1. `filteredExpenses` state: Lưu trữ kết quả danh sách chi tiêu sau khi lọc, được khởi tạo ban đầu là toàn bộ `expenses`.
  // 2. `debounceTimerRef` (useRef): Lưu giữ ID của timer (setTimeout) hiện tại. Dùng useRef giúp giữ giá trị của timer qua các lượt re-render mà không tự kích hoạt re-render.
  // 3. `useEffect` lắng nghe `[query, expenses]`: Khi người dùng nhập ký tự hoặc danh sách chi tiêu thay đổi:
  //    - Hủy (clearTimeout) timer cũ đang chờ (nếu có) để hủy bỏ các lần lọc chưa kịp chạy.
  //    - Thiết lập một timer mới 300ms.
  //    - Khi hết 300ms, gọi `filterExpenses` và cập nhật state `filteredExpenses`.
  //    - Trả về một cleanup function để xóa sạch timer khi component unmount hoặc trước khi effect kế tiếp kích hoạt.
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses)
  const debounceTimerRef = useRef<number | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = window.setTimeout(() => {
      const results = filterExpenses(expenses, query)
      setFilteredExpenses(results)
    }, 300)

    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query, expenses])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  function handleDeleteExpense(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <SearchBar query={query} onQueryChange={setQuery} />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
