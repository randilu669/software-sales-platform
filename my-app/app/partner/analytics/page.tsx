'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { BarChart3, TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

export default function PartnerAnalytics() {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalClicks: 142,
    totalConversions: 8,
    conversionRate: '5.6%',
    estimatedEarnings: 380.00
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Real-time Analytics & Performance</h1>
        <p className="text-slate-500 text-sm mb-8">Track your link clicks, conversion rates, and tier-based commission metrics.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Clicks</span>
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalClicks}</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">+12% this week</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Conversions</span>
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalConversions}</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">Verified sales</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Conversion Rate</span>
              <Activity className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.conversionRate}</div>
            <span className="text-xs text-slate-500 mt-1 inline-block">Industry average: 3.2%</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Est. Commissions</span>
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">${stats.estimatedEarnings}</div>
            <span className="text-xs text-slate-500 mt-1 inline-block">Tier 2 Partner (20%)</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" /> Commission Tier Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 p-6 rounded-2xl bg-slate-50">
              <h3 className="font-bold text-slate-700 text-sm">Silver Tier</h3>
              <p className="text-xs text-slate-500 mt-1">0 - 5 monthly sales</p>
              <div className="text-2xl font-extrabold text-indigo-600 mt-4">15% Commission</div>
            </div>
            <div className="border border-indigo-500 p-6 rounded-2xl bg-indigo-50/50 shadow-sm">
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Current Tier</span>
              <h3 className="font-bold text-slate-900 text-sm mt-2">Gold Tier</h3>
              <p className="text-xs text-slate-500 mt-1">6 - 20 monthly sales</p>
              <div className="text-2xl font-extrabold text-indigo-600 mt-4">20% Commission</div>
            </div>
            <div className="border border-slate-200 p-6 rounded-2xl bg-slate-50">
              <h3 className="font-bold text-slate-700 text-sm">Platinum Tier</h3>
              <p className="text-xs text-slate-500 mt-1">21+ monthly sales</p>
              <div className="text-2xl font-extrabold text-indigo-600 mt-4">25% Commission</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}