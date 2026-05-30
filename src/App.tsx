import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, query),
    [expenses, query],
  )

  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
  )

  // CÁCH LÀM VÀ GIẢI THÍCH FLOW:
  // Component ExpenseItem được bọc trong React.memo để ngăn chặn việc re-render không cần thiết khi các props truyền vào không thay đổi.
  // Tuy nhiên nếu ta khai báo handleDeleteExpense dưới dạng một hàm thông thường thì mỗi lần component App re-render hàm này sẽ được tạo mới với một tham chiếu hoàn toàn khác.
  // Điều này khiến prop onDeleteExpense truyền xuống ExpenseItem luôn bị coi là thay đổi làm mất hoàn toàn tác dụng tối ưu hiệu năng của React.memo.
  // Vì vậy việc bọc hàm này trong hook useCallback giúp giữ nguyên tham chiếu của hàm qua các lần render của component cha từ đó giúp tối ưu hóa hiệu năng render cho component con.
  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }, [])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <SearchBar query={query} onQueryChange={setQuery} />
        <ExpenseSummary total={total} />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
