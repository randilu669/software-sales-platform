'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart2, FileText, LayoutDashboard, Zap, Shield } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Partner Dashboard', href: '/partner/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', href: '/partner/analytics', icon: BarChart2 },
    { name: 'Marketing Assets', href: '/partner/assets', icon: FileText },
    { name: 'Admin Center', href: '/admin', icon: Shield },
  ]

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-slate-900 text-lg">Software Sales Partner</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{link.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}