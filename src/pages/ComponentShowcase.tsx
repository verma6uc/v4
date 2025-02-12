import React from 'react'
import { useParams } from 'react-router-dom'
import { ShowcaseLayout } from '../layouts/ShowcaseLayout'
import { DashboardPage } from './DashboardPage'
import { MetricCardsPage } from './MetricCardsPage'
import { ChartsPage } from './ChartsPage'
import { FormsPage } from './FormsPage'
import { TablesPage } from './TablesPage'
import { BadgesPage } from './BadgesPage'
import { ButtonsPage } from './ButtonsPage'
import { ModalsPage } from './ModalsPage'
import { TypographyPage } from './TypographyPage'

export function ComponentShowcase() {
  const { section = 'metrics' } = useParams()

  const getSectionTitle = () => {
    switch (section) {
      case 'dashboard':
        return 'Dashboard'
      case 'metrics':
        return 'Metric Cards'
      case 'charts':
        return 'Charts'
      case 'forms':
        return 'Forms'
      case 'tables':
        return 'Tables'
      case 'typography':
        return 'Typography'
      case 'badges':
        return 'Badges'
      case 'buttons':
        return 'Buttons'
      case 'modals':
        return 'Modals'
      case 'components':
        return 'Components'
      case 'settings':
        return 'Settings'
      default:
        return 'Metric Cards'
    }
  }

  const getSectionDescription = () => {
    switch (section) {
      case 'dashboard':
        return 'Overview of your platform.'
      case 'metrics':
        return 'Beautiful metric cards with trends and comparisons.'
      case 'charts':
        return 'Interactive charts for data visualization.'
      case 'forms':
        return 'Clean and responsive form components.'
      case 'tables':
        return 'Data tables with sorting and pagination.'
      case 'typography':
        return 'Text styles, headings, and content formatting.'
      case 'badges':
        return 'Status indicators and labels.'
      case 'buttons':
        return 'Interactive buttons and actions.'
      case 'modals':
        return 'Dialog windows and popups.'
      case 'components':
        return 'Reusable UI components.'
      case 'settings':
        return 'Platform configuration and preferences.'
      default:
        return 'Explore our beautiful components.'
    }
  }

  const renderContent = () => {
    switch (section) {
      case 'dashboard':
        return <DashboardPage />
      case 'metrics':
        return <MetricCardsPage />
      case 'charts':
        return <ChartsPage />
      case 'forms':
        return <FormsPage />
      case 'tables':
        return <TablesPage />
      case 'typography':
        return <TypographyPage />
      case 'badges':
        return <BadgesPage />
      case 'buttons':
        return <ButtonsPage />
      case 'modals':
        return <ModalsPage />
      case 'components':
        return (
          <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/20">
            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-2 text-gray-600">More components are on the way!</p>
          </div>
        )
      case 'settings':
        return (
          <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-white/20">
            <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            <p className="mt-2 text-gray-600">Configure your platform preferences.</p>
          </div>
        )
      default:
        return <MetricCardsPage />
    }
  }

  return (
    <ShowcaseLayout
      title={getSectionTitle()}
      description={getSectionDescription()}
    >
      {renderContent()}
    </ShowcaseLayout>
  )
}