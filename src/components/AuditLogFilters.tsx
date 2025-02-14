import React from 'react'
import { Search, Filter, X, Plus, ChevronDown, RotateCcw, Calendar } from 'lucide-react'
import { Button } from './Button'
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns'
import { Badge } from './Badge'

interface FilterGroup {
  operator: 'AND' | 'OR'
  conditions: FilterCondition[]
}

interface FilterCondition {
  field: string
  operator: string
  value: string
}

interface DateRange {
  start: Date
  end: Date
}

interface AuditLogFiltersProps {
  onFilterChange: (filters: FilterGroup[], dateRange: DateRange) => void
}

export function AuditLogFilters({ onFilterChange }: AuditLogFiltersProps) {
  const [showFilters, setShowFilters] = React.useState(false)
  const [filterGroups, setFilterGroups] = React.useState<FilterGroup[]>([
    {
      operator: 'AND',
      conditions: [{ field: 'action', operator: 'equals', value: '' }]
    }
  ])
  const [draftFilterGroups, setDraftFilterGroups] = React.useState(filterGroups)
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000),
    end: new Date()
  })
  const [draftDateRange, setDraftDateRange] = React.useState(dateRange)

  const PRESET_RANGES = [
    { label: 'Last 24 hours', getValue: () => ({ start: subDays(new Date(), 1), end: new Date() }) },
    { label: 'Last 7 days', getValue: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
    { label: 'Last 30 days', getValue: () => ({ start: subDays(new Date(), 30), end: new Date() }) },
    { label: 'Last 90 days', getValue: () => ({ start: subDays(new Date(), 90), end: new Date() }) }
  ]

  const fields = [
    { 
      value: 'action',
      label: 'Action',
      type: 'select',
      options: ['create', 'update', 'delete', 'login', 'logout', 'export', 'import', 'approve', 'reject']
    },
    {
      value: 'category',
      label: 'Category',
      type: 'select',
      options: ['user', 'company', 'billing', 'security', 'system', 'data']
    },
    {
      value: 'severity',
      label: 'Severity',
      type: 'select',
      options: ['info', 'warning', 'critical']
    },
    {
      value: 'actor',
      label: 'Actor',
      type: 'text'
    },
    {
      value: 'entity',
      label: 'Entity',
      type: 'text'
    },
    {
      value: 'entityId',
      label: 'Entity ID',
      type: 'text'
    },
    {
      value: 'ip',
      label: 'IP Address',
      type: 'text'
    },
    {
      value: 'company.name',
      label: 'Company',
      type: 'text',
      placeholder: 'Search by company name'
    },
    {
      value: 'space.name',
      label: 'Space',
      type: 'text'
    },
    {
      value: 'application.name',
      label: 'Application',
      type: 'text'
    }
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
    ]
  }

  const handleFilterChange = (groupIndex: number, conditionIndex: number, field: keyof FilterCondition, value: string) => {
    const newGroups = [...draftFilterGroups]
    const condition = newGroups[groupIndex].conditions[conditionIndex]
    
    if (field === 'field') {
      const fieldType = fields.find(f => f.value === value)?.type || 'text'
      condition.operator = operators[fieldType as keyof typeof operators][0].value
    }
    
    condition[field] = value
    setDraftFilterGroups(newGroups)
  }

  const handleOperatorChange = (groupIndex: number, operator: 'AND' | 'OR') => {
    const newGroups = [...draftFilterGroups]
    newGroups[groupIndex].operator = operator
    setDraftFilterGroups(newGroups)
  }

  const addCondition = (groupIndex: number) => {
    const newGroups = [...draftFilterGroups]
    newGroups[groupIndex].conditions.push({ field: 'action', operator: 'equals', value: '' })
    setDraftFilterGroups(newGroups)
  }

  const removeCondition = (groupIndex: number, conditionIndex: number) => {
    const newGroups = [...draftFilterGroups]
    newGroups[groupIndex].conditions = newGroups[groupIndex].conditions.filter((_, i) => i !== conditionIndex)
    
    // Remove group if it has no conditions
    if (newGroups[groupIndex].conditions.length === 0) {
      newGroups.splice(groupIndex, 1)
    }
    
    setDraftFilterGroups(newGroups)
  }

  const addGroup = () => {
    setDraftFilterGroups([
      ...draftFilterGroups,
      {
        operator: 'AND',
        conditions: [{ field: 'action', operator: 'equals', value: '' }]
      }
    ])
  }

  const handlePresetSelect = (preset: typeof PRESET_RANGES[0]) => {
    const range = preset.getValue()
    setDraftDateRange(range)
  }

  const handleApplyFilters = () => {
    setFilterGroups(draftFilterGroups)
    setDateRange(draftDateRange)
    onFilterChange(draftFilterGroups, draftDateRange)
  }

  const handleResetFilters = () => {
    const initialFilters: FilterGroup[] = [{
      operator: 'AND',
      conditions: [{ field: 'action', operator: 'equals', value: '' }]
    }]
    const initialDateRange = {
      start: new Date(Date.now() - 24 * 60 * 60 * 1000),
      end: new Date()
    }
    setFilterGroups(initialFilters)
    setDraftFilterGroups(initialFilters)
    setDateRange(initialDateRange)
    setDraftDateRange(initialDateRange)
    onFilterChange(initialFilters, initialDateRange)
  }

  React.useEffect(() => {
    setDraftFilterGroups(filterGroups)
  }, [filterGroups])

  const getFieldType = (fieldValue: string) => {
    return fields.find(f => f.value === fieldValue)?.type || 'text'
  }

  return (
    <div className="space-y-4">

      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={addGroup}
              className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded"
            >
              <Plus className="w-4 h-4" />
              Add Filter Group
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-4">
            {/* Date Range Section */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Date Range</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {PRESET_RANGES.map((preset, index) => (
                    <button
                      key={index}
                      className={`
                        px-3 py-1.5 text-left text-sm rounded-md
                        ${format(draftDateRange.start, 'yyyy-MM-dd') === format(preset.getValue().start, 'yyyy-MM-dd')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      onClick={() => handlePresetSelect(preset)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Custom Range</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Start Date</label>
                      <input
                        type="date"
                        className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={format(draftDateRange.start, 'yyyy-MM-dd')}
                        max={format(draftDateRange.end, 'yyyy-MM-dd')}
                        onChange={(e) => setDraftDateRange(prev => ({
                          ...prev,
                          start: startOfDay(new Date(e.target.value))
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">End Date</label>
                      <input
                        type="date"
                        className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={format(draftDateRange.end, 'yyyy-MM-dd')}
                        min={format(draftDateRange.start, 'yyyy-MM-dd')}
                        max={format(new Date(), 'yyyy-MM-dd')}
                        onChange={(e) => setDraftDateRange(prev => ({
                          ...prev,
                          end: endOfDay(new Date(e.target.value))
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Groups */}
            {draftFilterGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4 last:mb-0">
                {groupIndex > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm font-medium text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                )}
                
                <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
                  {group.conditions.length > 1 && (
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={group.operator === 'AND' ? 'primary' : 'default'}
                        className="cursor-pointer"
                        onClick={() => handleOperatorChange(groupIndex, 'AND')}
                      >
                        AND
                      </Badge>
                      <Badge
                        variant={group.operator === 'OR' ? 'primary' : 'default'}
                        className="cursor-pointer"
                        onClick={() => handleOperatorChange(groupIndex, 'OR')}
                      >
                        OR
                      </Badge>
                    </div>
                  )}

                  {group.conditions.map((condition, conditionIndex) => {
                    const fieldType = getFieldType(condition.field)
                    const currentOperators = operators[fieldType as keyof typeof operators]
                    const field = fields.find(f => f.value === condition.field)

                    return (
                      <div key={conditionIndex} className="flex items-center gap-2">
                        <select
                          value={condition.field}
                          onChange={(e) => handleFilterChange(groupIndex, conditionIndex, 'field', e.target.value)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                          {fields.map((field) => (
                            <option key={field.value} value={field.value}>
                              {field.label}
                            </option>
                          ))}
                        </select>

                        <select
                          value={condition.operator}
                          onChange={(e) => handleFilterChange(groupIndex, conditionIndex, 'operator', e.target.value)}
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
                            value={condition.value}
                            onChange={(e) => handleFilterChange(groupIndex, conditionIndex, 'value', e.target.value)}
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          >
                            <option value="">Select...</option>
                            {field?.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={fieldType}
                            value={condition.value}
                            onChange={(e) => handleFilterChange(groupIndex, conditionIndex, 'value', e.target.value)}
                            placeholder="Value"
                            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeCondition(groupIndex, conditionIndex)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {conditionIndex === group.conditions.length - 1 && (
                            <button
                              onClick={() => addCondition(groupIndex)}
                              className="p-1 text-blue-600 hover:text-blue-700"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}