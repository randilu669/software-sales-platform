'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Shield, CheckCircle, Clock, DollarSign, Users } from 'lucide-react'

export default function AdminControlCenter() {
  const [payouts, setPayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayouts()
  }, [])

  const fetchPayouts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('payouts')
      .select('*, sales_persons(full_name, email)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPayouts(data)
    }
    setLoading(false)
  }

  const handleApprovePayout = async (payoutId: string, partnerId: string, amount: number) => {
    // Update payout status to approved/paid
    const { error: payoutError } = await supabase
      .from('payouts')
      .update({ status: 'paid' })
      .eq('id', payoutId)

    if (!payoutError) {
      // Refresh list
      fetchPayouts()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-rose-600 text-white p-2 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Center</h1>
        </div>
        <p className="text-slate-500 text-sm mb-8">Manage partner payout requests, review compliance, and monitor network transactions.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase">Total Payout Requests</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{payouts.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase">Pending Payouts</span>
            <div className="text-3xl font-extrabold text-amber-600 mt-2">
              {payouts.filter(p => p.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-400 font-bold uppercase">Completed Payouts</span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-2">
              {payouts.filter(p => p.status === 'paid').length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Partner Payout Queue</h2>
            <button onClick={fetchPayouts} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl font-semibold transition">Refresh</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 uppercase font-bold">
                  <th className="p-4 pl-6">Partner Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-400">Loading requests...</td>
                  </tr>
                ) : payouts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-400">No payout requests found.</td>
                  </tr>
                ) : (
                  payouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 pl-6 font-bold text-slate-900">{payout.sales_persons?.full_name || 'N/A'}</td>
                      <td className="p-4 text-slate-600 text-xs">{payout.sales_persons?.email || 'N/A'}</td>
                      <td className="p-4 font-extrabold text-emerald-600">${payout.amount}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          payout.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {payout.status === 'pending' ? (
                          <button
                            onClick={() => handleApprovePayout(payout.id, payout.partner_id, payout.amount)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
                          >
                            Mark as Paid
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold flex items-center justify-end gap-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" /> Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}