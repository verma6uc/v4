import React from 'react'
import { Menu, Search } from 'lucide-react'
import { Logo } from '../Logo'
import { UserMenu } from '../UserMenu'

export function Header() {
  return (
    <header className="fixed w-full z-10 backdrop-blur-xl bg-white/70 border-b border-white/20">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <Logo />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/50 backdrop-blur-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                placeholder-gray-400 text-gray-600"
            />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}