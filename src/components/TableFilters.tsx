import React from 'react'
import { Search, Filter, X, Plus, ChevronDown, Calendar, Clock } from 'lucide-react'

interface FilterCondition {
  field: string
  operator: string
  value: string
}

interface TableFiltersProps {
  onSearch: (value: string) => void
  onFilter: (filters: FilterCondition[]) => void
}

export function TableFilters({ onSearch, onFilter }: TableFiltersProps) {
  const [showFilters, setShowFilters] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [filters, setFilters] = React.useState<FilterCondition[]>([
    { field: 'name', operator: 'contains', value: '' }
  ])
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = React.useState(false)

  const fields = [
    { value: 'name', label: 'Name', type: 'text', suggestions: ['John', 'Jane', 'Bob', 'Alice'] },
    { value: 'email', label: 'Email', type: 'email', suggestions: ['@example.com', '@gmail.com'] },
    { value: 'role', label: 'Role', type: 'select', options: ['Admin', 'User', 'Editor'] },
    { value: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
    { value: 'lastActive', label: 'Last Active', type: 'datetime' }
  ]

  const operators = {
    text: [
      { value: 'contains', label: 'Contains' },
      { value: 'equals', label: 'Equals' },
      { value: 'startsWith', label: 'Starts with' },
      { value: 'endsWith', label: 'Ends with' }
    ],
    select: [
      { value: 'equals', label: 'Equals' },
      { value: 'notEquals', label: 'Does not equal' }
    ],
    datetime: [
      { value: 'greaterThan', label: 'After' },
      { value: 'lessThan', label: 'Before' },
      { value: 'equals', label: 'On' }
    ]
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)

    // Show suggestions based on search value
    if (value.length > 0) {
      const allSuggestions = fields.flatMap(field => field.suggestions || [])
      const filtered = allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleFilterChange = (index: number, field: keyof FilterCondition, value: string) => {
    const newFilters = [...filters]
    newFilters[index] = { ...newFilters[index], [field]: value }

    // Reset operator when field type changes
    if (field === 'field') {
      const fieldType = fields.find(f => f.value === value)?.type || 'text'
      newFilters[index].operator = operators[fieldType as keyof typeof operators][0].value
    }

    setFilters(newFilters)
    onFilter(newFilters)
  }

  const addFilter = () => {
    setFilters([...filters, { field: 'name', operator: 'contains', value: '' }])
  }

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index)
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const getFieldType = (fieldValue: string) => {
    return fields.find(f => f.value === fieldValue)?.type || 'text'
  }

  return (
    <div className="space-y-4">
      {/* Search Bar with Suggestions */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
        />
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  setSearchValue(suggestion)
                  onSearch(suggestion)
                  setShowSuggestions(false)
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={addFilter}
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded"
          >
            <Plus className="w-4 h-4" />
            Add Filter
          </button>
        </div>

        {showFilters && (
          <div className="space-y-3">
            {filters.map((filter, index) => {
              const fieldType = getFieldType(filter.field)
              const currentOperators = operators[fieldType as keyof typeof operators]
              const field = fields.find(f => f.value === filter.field)

              return (
                <div key={index} className="flex items-center gap-2">
                  <select
                    value={filter.field}
                    onChange={(e) => handleFilterChange(index, 'field', e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {fields.map((field) => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filter.operator}
                    onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {currentOperators.map((operator) => (
                      <option key={operator.value} value={operator.value}>
                        {operator.label}
                      </option>
                    ))}
                  </select>

                  {fieldType === 'select' ? (
                    <select
                      value={filter.value}
                      onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">Select...</option>
                      {field?.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : fieldType === 'datetime' ? (
                    <div className="flex-1 relative">
                      <input
                        type="datetime-local"
                        value={filter.value}
                        onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  ) : (
                    <input
                      type={fieldType}
                      value={filter.value}
                      onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      list={`suggestions-${index}`}
                    />
                  )}

                  {field?.suggestions && (
                    <datalist id={`suggestions-${index}`}>
                      {field.suggestions.map((suggestion, i) => (
                        <option key={i} value={suggestion} />
                      ))}
                    </datalist>
                  )}

                  <button
                    onClick={() => removeFilter(index)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}