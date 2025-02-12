import React from 'react';
import { Shield, Users, Layers, Settings, Globe, Building2 } from 'lucide-react';
import { Logo } from './components/Logo';

function App() {
  return (
    <div className="min-h-screen bg-squares">
      <header className="sticky top-0 left-0 right-0 bg-white/70 backdrop-blur-frosted border-b border-blue-100 z-50">
        <div className="w-[97vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                Enterprise
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="w-[97vw] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">YuVi</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Enterprise Management Platform for Multi-Tenant Environments
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center sm:space-x-4 md:mt-12">
            <div className="mb-4 sm:mb-0">
              <a href="#" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] active:bg-blue-800 transition-all duration-150 md:text-lg">
                Request Demo
              </a>
            </div>
            <div>
              <a href="#" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-base font-medium rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98] active:bg-gray-300 transition-all duration-150 md:text-lg">
                Contact Sales
              </a>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-blue-900 mt-24 mb-12">Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-md">
              <Shield className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-blue-900 mb-3">Secure Multi-Tenancy</h3>
              <p className="text-gray-500">Isolated environments with robust security controls and SSO integration.</p>
            </div>
            <div className="group p-8 bg-white hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-md">
              <Users className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-blue-900 mb-3">User Management</h3>
              <p className="text-gray-500">Granular permissions and role-based access control across organizations.</p>
            </div>
            <div className="group p-8 bg-white hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-md">
              <Layers className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-blue-900 mb-3">Organization Hierarchy</h3>
              <p className="text-gray-500">Flexible space types and templates for complex organizational structures.</p>
            </div>
            <div className="group p-8 bg-white hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-md">
              <Settings className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-blue-900 mb-3">Company Configuration</h3>
              <p className="text-gray-500">Customizable settings for security, branding, and operational preferences.</p>
            </div>
            <div className="group p-8 bg-white hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-md">
              <Globe className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-blue-900 mb-3">Global Monitoring</h3>
              <p className="text-gray-500">Real-time insights and comprehensive audit trails across all companies.</p>
            </div>
            <div className="group p-8 bg-white hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-md">
              <Building2 className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-blue-900 mb-3">Company Provisioning</h3>
              <p className="text-gray-500">Streamlined onboarding and automated setup for new organizations.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
