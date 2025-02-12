import React from 'react'
import { Button, ButtonGroup, IconButton, SplitButton } from '../components/Button'
import { 
  Plus, 
  Trash, 
  Settings, 
  Save, 
  Download, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Mail,
  Share,
  Edit,
  MoreHorizontal,
  Check,
  AlertTriangle,
  Copy,
  Archive,
  ExternalLink
} from 'lucide-react'

export function ButtonsPage() {
  const [loading, setLoading] = React.useState(false)

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Light Variants */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Light Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Default Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success" icon={<Check />}>Success</Button>
          <Button variant="warning" icon={<AlertTriangle />}>Warning</Button>
        </div>
      </div>

      {/* Dark Variants */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dark Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary-dark">Primary Dark</Button>
          <Button variant="secondary-dark">Secondary Dark</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<Plus />}>Add New</Button>
          <Button icon={<Save />} variant="secondary">Save</Button>
          <Button icon={<Trash />} variant="danger">Delete</Button>
          <Button icon={<Download />} variant="outline">Download</Button>
          <Button icon={<Settings />} variant="ghost">Settings</Button>
          <Button icon={<ChevronRight />} iconPosition="right" variant="primary-dark">Next</Button>
        </div>
      </div>

      {/* Icon Only Buttons */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Icon Only Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton icon={<Plus />} tooltip="Add New" />
          <IconButton icon={<Edit />} variant="secondary" tooltip="Edit" />
          <IconButton icon={<Trash />} variant="danger" tooltip="Delete" />
          <IconButton icon={<Share />} variant="outline" tooltip="Share" />
          <IconButton icon={<MoreHorizontal />} variant="ghost" tooltip="More" />
          
          {/* Different Sizes */}
          <IconButton icon={<Mail />} size="sm" variant="primary-dark" tooltip="Small" />
          <IconButton icon={<Mail />} size="md" variant="primary-dark" tooltip="Medium" />
          <IconButton icon={<Mail />} size="lg" variant="primary-dark" tooltip="Large" />
        </div>
      </div>

      {/* Split Buttons */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Split Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <SplitButton
            mainText="Create New"
            menuItems={[
              { label: 'New File', icon: <Plus />, onClick: () => {} },
              { label: 'Copy', icon: <Copy />, onClick: () => {} },
              { label: 'Archive', icon: <Archive />, onClick: () => {} },
            ]}
          />
          <SplitButton
            mainText="Export"
            variant="secondary"
            menuItems={[
              { label: 'Download PDF', icon: <Download />, onClick: () => {} },
              { label: 'Share Link', icon: <ExternalLink />, onClick: () => {} },
            ]}
          />
          <SplitButton
            mainText="Settings"
            variant="outline"
            menuItems={[
              { label: 'Edit Profile', icon: <Edit />, onClick: () => {} },
              { label: 'Preferences', icon: <Settings />, onClick: () => {} },
            ]}
          />
        </div>
      </div>

      {/* Button Groups */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Button Groups</h3>
        <div className="space-y-6">
          {/* Connected Groups */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Connected</h4>
            <div className="space-y-4">
              <ButtonGroup>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </ButtonGroup>

              <ButtonGroup>
                <IconButton icon={<ChevronLeft />} tooltip="Previous" />
                <IconButton icon={<Download />} tooltip="Download" />
                <IconButton icon={<Upload />} tooltip="Upload" />
                <IconButton icon={<ChevronRight />} tooltip="Next" />
              </ButtonGroup>

              <ButtonGroup>
                <Button variant="primary-dark">Left</Button>
                <Button variant="primary-dark">Middle</Button>
                <Button variant="primary-dark">Right</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Spaced Groups */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">With Spacing</h4>
            <div className="space-y-4">
              <ButtonGroup spacing="sm">
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </ButtonGroup>

              <ButtonGroup spacing="md">
                <IconButton icon={<ChevronLeft />} tooltip="Previous" />
                <IconButton icon={<Download />} tooltip="Download" />
                <IconButton icon={<Upload />} tooltip="Upload" />
                <IconButton icon={<ChevronRight />} tooltip="Next" />
              </ButtonGroup>
            </div>
          </div>

          {/* Vertical Groups */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Vertical</h4>
            <div className="flex gap-4">
              <ButtonGroup vertical>
                <Button>Top</Button>
                <Button>Middle</Button>
                <Button>Bottom</Button>
              </ButtonGroup>

              <ButtonGroup vertical spacing="sm">
                <Button variant="outline">Top</Button>
                <Button variant="outline">Middle</Button>
                <Button variant="outline">Bottom</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button onClick={simulateLoading} loading={loading}>
            {loading ? 'Saving...' : 'Click to Load'}
          </Button>
          <Button variant="primary-dark" disabled>Dark Disabled</Button>
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Full Width Buttons</h3>
        <div className="space-y-4 max-w-md">
          <Button fullWidth>Light Button</Button>
          <Button variant="primary-dark" fullWidth>Dark Button</Button>
          <ButtonGroup fullWidth>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Rounded Variants */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rounded Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button rounded="lg">Default Rounded</Button>
          <Button rounded="full">Fully Rounded</Button>
          <Button variant="primary-dark" rounded="full">Dark Rounded</Button>
          <IconButton icon={<Plus />} rounded="full" tooltip="Add" />
        </div>
      </div>

      {/* Common Use Cases */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Common Use Cases</h3>
        <div className="space-y-4">
          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary-dark" icon={<Save />}>Save Changes</Button>
          </div>

          {/* Card Actions */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-4">Card Title</h4>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">Learn More</Button>
              <ButtonGroup spacing="sm">
                <IconButton icon={<Edit />} variant="ghost" size="sm" tooltip="Edit" />
                <IconButton icon={<Trash />} variant="ghost" size="sm" tooltip="Delete" />
                <IconButton icon={<MoreHorizontal />} variant="ghost" size="sm" tooltip="More" />
              </ButtonGroup>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <IconButton icon={<ChevronLeft />} variant="outline" tooltip="Previous" />
            <Button variant="ghost">1</Button>
            <Button variant="primary">2</Button>
            <Button variant="ghost">3</Button>
            <IconButton icon={<ChevronRight />} variant="outline" tooltip="Next" />
          </div>
        </div>
      </div>
    </div>
  )
}