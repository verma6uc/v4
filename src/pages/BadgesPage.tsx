import React from 'react'
import { Badge } from '../components/Badge'
import { Bell, Check, X, AlertTriangle, Info } from 'lucide-react'

export function BadgesPage() {
  return (
    <div className="space-y-8">
      {/* Basic Badges */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Badges</h3>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      {/* Outline Badges */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Outline Badges</h3>
        <div className="flex flex-wrap gap-4">
          <Badge outline>Default</Badge>
          <Badge variant="primary" outline>Primary</Badge>
          <Badge variant="success" outline>Success</Badge>
          <Badge variant="warning" outline>Warning</Badge>
          <Badge variant="error" outline>Error</Badge>
          <Badge variant="info" outline>Info</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      {/* Rounded Variants */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rounded Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Badge rounded="full">Rounded Full</Badge>
          <Badge rounded="lg">Rounded Large</Badge>
        </div>
      </div>

      {/* With Dot */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">With Dot Indicator</h3>
        <div className="flex flex-wrap gap-4">
          <Badge dot>Default</Badge>
          <Badge variant="primary" dot>Primary</Badge>
          <Badge variant="success" dot>Success</Badge>
          <Badge variant="warning" dot>Warning</Badge>
          <Badge variant="error" dot>Error</Badge>
          <Badge variant="info" dot>Info</Badge>
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Common Use Cases</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary" dot>
            <Bell className="w-4 h-4 mr-1" />
            Notifications
          </Badge>
          <Badge variant="success">
            <Check className="w-4 h-4 mr-1" />
            Completed
          </Badge>
          <Badge variant="error">
            <X className="w-4 h-4 mr-1" />
            Failed
          </Badge>
          <Badge variant="warning">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Warning
          </Badge>
          <Badge variant="info">
            <Info className="w-4 h-4 mr-1" />
            Information
          </Badge>
        </div>
      </div>

      {/* Custom Combinations */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Combinations</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="success" size="lg" outline dot>
            Large Success with Dot
          </Badge>
          <Badge variant="error" size="sm" rounded="lg">
            Small Error Badge
          </Badge>
          <Badge variant="warning" outline rounded="lg" dot>
            Warning with Everything
          </Badge>
        </div>
      </div>
    </div>
  )
}