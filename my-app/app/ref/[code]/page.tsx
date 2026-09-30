'use client'

import { useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ReferralHandler({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = use(params)
  const code = resolvedParams.code
  const router = useRouter()

  useEffect(() => {
    async function trackClick() {
      if (code) {
        const { data: partner } = await supabase.from('sales_persons').select('id').eq('referral_code', code).single()
        if (partner) {
          await supabase.from('referral_clicks').insert([{ partner_id: partner.id, referral_code: code }])
          localStorage.setItem('ref_code', code)
        }
      }
      router.push('/')
    }
    trackClick()
  }, [code, router])

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <p className="text-lg font-medium animate-pulse">Redirecting to partner offer...</p>
    </div>
  )
}