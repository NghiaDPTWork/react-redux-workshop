import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import AppHeader from './components/AppHeader'
import { AppContext } from './context/AppContext'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')

  const [currency, setCurrency] = useState<'USD' | 'VND'>('USD')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const currencySymbol = currency === 'USD' ? '$' : '₫'

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

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }, [])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  // CÁCH LÀM VÀ GIẢI THÍCH FLOW:
  // Component App đóng vai trò là nhà cung cấp dữ liệu bằng cách sử dụng thẻ AppContext.Provider bọc lấy toàn bộ cấu trúc giao diện của ứng dụng.
  // Các giá trị như tiền tệ giao diện sáng tối và tổng chi phí được truyền vào thuộc tính value của Provider để sẵn sàng chia sẻ cho các component con bên dưới.
  return (
    <AppContext.Provider value={{ currency, setCurrency, theme, setTheme, currencySymbol, total }}>
      <div className="app-layout" data-theme={theme}>
        <aside>
          <h1>Expense Manager</h1>
          <AppHeader />
          <ExpenseForm onAddExpense={handleAddExpense} />
        </aside>
        <main>
          <SearchBar query={query} onQueryChange={setQuery} />
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            currencySymbol={currencySymbol}
            total={total}
            theme={theme}
          />
        </main>
      </div>
    </AppContext.Provider>
  )
}

export default App
