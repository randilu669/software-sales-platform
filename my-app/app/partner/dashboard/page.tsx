'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Copy, DollarSign, TrendingUp, CheckCircle, Shield } from 'lucide-react'

export default function PartnerDashboard() {
  const [email, setEmail] = useState('')
  const [partner, setPartner] = useState<any>(null)
  const [error, setError] = useState('')
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { data, error } = await supabase.from('sales_persons').select('*').eq('email', email).single()
    if (error || !data) {
      setError('Partner not found with this email.')
    } else {
      setPartner(data)
    }
  }

  const handleRequestPayout = async () => {
    if (!partner || partner.wallet_balance <= 0) return
    setRequestLoading(true)
    
    const { error } = await supabase.from('payouts').insert([
      {
        partner_id: partner.id,
        amount: partner.wallet_balance,
        status: 'pending'
      }
    ])

    if (!error) {
      setRequestSuccess(true)
    }
    setRequestLoading(false)
  }

  const referralLink = partner ? `${window.location.origin}/ref/${partner.referral_code}` : ''

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Partner Portal</h1>
        <p className="text-slate-500 text-sm mb-8">Track your referral clicks, sales commissions, and request payouts.</p>

        {!partner ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-md">
            <h2 className="text-xl font-bold mb-4">Sign In to Dashboard</h2>
            {error && <p className="text-rose-600 text-sm mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Your Registered Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">Access Dashboard</button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Welcome, {partner.full_name}</h3>
                <p className="text-xs text-slate-500">Status: <span className="font-bold text-emerald-600 uppercase">{partner.status}</span></p>
              </div>
              <button onClick={() => setPartner(null)} className="text-xs text-rose-600 font-bold hover:underline">Sign Out</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Wallet Balance</span>
                  <div className="text-3xl font-extrabold text-emerald-600 mt-2">${partner.wallet_balance || 0.00}</div>
                </div>
                <button 
                  onClick={handleRequestPayout}
                  disabled={requestLoading || partner.wallet_balance <= 0}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                >
                  {requestLoading ? 'Processing...' : 'Request Payout'}
                </button>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-bold uppercase">Total Earnings</span>
                <div className="text-3xl font-extrabold text-indigo-600 mt-2">${partner.total_earnings || 0.00}</div>
              </div>
            </div>

            {requestSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-sm">
                Payout request successfully submitted to admin!
              </div>
            )}

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">Your Unique Referral Link</h4>
              <div className="flex gap-2">
                <input type="text" readOnly value={referralLink} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl font-mono text-sm text-slate-600" />
                <button onClick={() => navigator.clipboard.writeText(referralLink)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2">
                  <Copy className="w-4 h-4" /> Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}