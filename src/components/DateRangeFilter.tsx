import React from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns'

interface DateRange {
  start: Date
  end: Date
}

interface DateRangeFilterProps {
  onChange: (range: DateRange) => void
  className?: string
}

const PRESET_RANGES = [
  { label: 'Last 24 hours', getValue: () => ({ start: subDays(new Date(), 1), end: new Date() }) },
  { label: 'Last 7 days', getValue: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
  { label: 'Last 30 days', getValue: () => ({ start: subDays(new Date(), 30), end: new Date() }) },
  { label: 'Last 90 days', getValue: () => ({ start: subDays(new Date(), 90), end: new Date() }) },
  { label: 'Last 6 months', getValue: () => ({ start: subMonths(new Date(), 6), end: new Date() }) },
  { label: 'Last 12 months', getValue: () => ({ start: subMonths(new Date(), 12), end: new Date() }) }
]

export function DateRangeFilter({ onChange, className = '' }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedRange, setSelectedRange] = React.useState<DateRange>(PRESET_RANGES[2].getValue())
  const [customRange, setCustomRange] = React.useState<DateRange>({
    start: new Date(),
    end: new Date()
  })
  const [isCustom, setIsCustom] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePresetSelect = (preset: typeof PRESET_RANGES[0]) => {
    const range = preset.getValue()
    setSelectedRange(range)
    setIsCustom(false)
    onChange(range)
    setIsOpen(false)
  }

  const handleCustomRangeSelect = () => {
    if (customRange.start && customRange.end) {
      const range = {
        start: startOfDay(customRange.start),
        end: endOfDay(customRange.end)
      }
      setSelectedRange(range)
      setIsCustom(true)
      onChange(range)
      setIsOpen(false)
    }
  }

  const getDisplayText = () => {
    if (isCustom) {
      return `${format(selectedRange.start, 'MMM d, yyyy')} - ${format(selectedRange.end, 'MMM d, yyyy')}`
    }
    const preset = PRESET_RANGES.find(
      p => 
        p.getValue().start.getTime() === selectedRange.start.getTime() &&
        p.getValue().end.getTime() === selectedRange.end.getTime()
    )
    return preset ? preset.label : 'Custom Range'
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between min-w-[200px]"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{getDisplayText()}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
          <div className="px-3 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Select Range</h3>
          </div>

          <div className="p-3 space-y-2">
            {PRESET_RANGES.map((preset, index) => (
              <button
                key={index}
                className={`
                  w-full px-3 py-1.5 text-left text-sm rounded-md
                  ${!isCustom && preset.getValue().start.getTime() === selectedRange.start.getTime()
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                onClick={() => handlePresetSelect(preset)}
              >
                {preset.label}
              </button>
            ))}

            <div className="pt-2 border-t border-gray-200 mt-2">
              <h4 className="text-xs font-medium text-gray-500 mb-2">Custom Range</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Start Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={format(customRange.start, 'yyyy-MM-dd')}
                    max={format(customRange.end, 'yyyy-MM-dd')}
                    onChange={(e) => setCustomRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">End Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={format(customRange.end, 'yyyy-MM-dd')}
                    min={format(customRange.start, 'yyyy-MM-dd')}
                    max={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setCustomRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 bg-white hover:bg-gray-50"
                  onClick={handleCustomRangeSelect}
                >
                  Apply Custom Range
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}