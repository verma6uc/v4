import React from 'react';
import { Menu, Search, ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { Logo } from '../components/Logo';

interface DocsLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  const location = useLocation();
  const isActive = matchPath(to, location.pathname);
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
        isActive
          ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}

interface NavGroupProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function NavGroup({ title, defaultOpen = false, children }: NavGroupProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors group"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`space-y-1 overflow-hidden transition-all ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const location = useLocation();
  const isFeaturePage = location.pathname.includes('/docs/features/');

  return (
    <div className="min-h-screen bg-squares">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 bg-white/70 backdrop-blur-frosted border-b border-blue-100 z-50">
        <div className="w-[97vw] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <Logo />
            </div>
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/docs/introduction" className="text-sm text-gray-600 hover:text-gray-900">Documentation</Link>
              <Link to="/api" className="text-sm text-gray-600 hover:text-gray-900">API</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="w-[97vw] mx-auto px-4">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 py-8 pr-8">
            <nav className="space-y-1">
              <NavGroup title="Getting Started" defaultOpen={!isFeaturePage}>
                <NavItem to="/docs/introduction">Introduction</NavItem>
                <NavItem to="/docs/installation">Installation</NavItem>
                <NavItem to="/docs/quickstart">Quickstart</NavItem>
              </NavGroup>
              
              <NavGroup title="Company Management" defaultOpen={isFeaturePage}>
                <NavItem to="/docs/features/company-provisioning">Company Provisioning</NavItem>
                <NavItem to="/docs/features/company-management">Company Management</NavItem>
                <NavItem to="/docs/features/company-configuration">Company Configuration</NavItem>
                <NavItem to="/docs/features/organization-hierarchy">Organization Hierarchy</NavItem>
              </NavGroup>
              
              <NavGroup title="User Management" defaultOpen={isFeaturePage}>
                <NavItem to="/docs/features/user-management">Users & Permissions</NavItem>
                <NavItem to="/docs/features/self-signup">Self Signup</NavItem>
              </NavGroup>
              
              <NavGroup title="Applications" defaultOpen={isFeaturePage}>
                <NavItem to="/docs/features/application-creation">Application Creation</NavItem>
              </NavGroup>
              
              <NavGroup title="Billing & Integration" defaultOpen={isFeaturePage}>
                <NavItem to="/docs/features/billing-subscription">Billing & Subscription</NavItem>
                <NavItem to="/docs/features/integrations">Integrations</NavItem>
              </NavGroup>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 py-8">
            <div className="prose prose-blue max-w-none xl:prose-lg">
              {children}
            </div>

            {/* Navigation Footer */}
            <div className="mt-16 flex items-center justify-between pt-4 border-t">
              <Link to="#" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                Previous
              </Link>
              <Link to="#" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}