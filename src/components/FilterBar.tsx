import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { setFilter, clearFilters } from '../store/slices/filtersSlice'
import { CATEGORIES } from '../constants'

function FilterBar() {
  const dispatch = useDispatch()
  const activeCategory = useSelector((state: RootState) => state.filters.category)

  function handleCategoryClick(category: string) {
    if (category === activeCategory) {
      dispatch(clearFilters())
    } else {
      dispatch(setFilter(category))
    }
  }

  function handleClear() {
    dispatch(clearFilters())
  }

  return (
    <div className="filter-bar">
      <span className="filter-bar-label">Filter by category:</span>
      <div className="filter-bar-chips">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`filter-chip${activeCategory === category ? ' active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {activeCategory && (
        <button className="filter-clear-btn" onClick={handleClear}>
          Clear filter
        </button>
      )}
    </div>
  )
}

export default FilterBar
