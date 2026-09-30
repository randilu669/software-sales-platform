'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { DollarSign, Package, ArrowRight, ShieldCheck, TrendingUp, Users, Sparkles, Clock } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  commission_rate: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('products').select('*')
        if (error) {
          console.error('Error fetching products:', error)
          setErrorMsg('Failed to fetch products from the database.')
        } else {
          setProducts(data || [])
        }
      } catch (err: any) {
        console.error('Unexpected error:', err)
        setErrorMsg('An unexpected error occurred.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleRegister = async () => {
    console.log("Register button clicked!", { fullName, email, phone })
    setErrorMsg('')
    setSuccessMsg('')

    if (!fullName || !email || !phone) {
      setErrorMsg('Please fill in all fields.')
      return
    }

    try {
      const referralCode = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase()

      const { data, error } = await supabase.from('sales_persons').insert([
        { 
          full_name: fullName, 
          email, 
          phone, 
          referral_code: referralCode,
          status: 'pending',
          wallet_balance: 0.00,
          total_earnings: 0.00
        }
      ]).select()

      if (error) {
        console.error('Supabase Error:', error)
        setErrorMsg('Registration failed: ' + error.message)
      } else {
        console.log('Inserted successfully:', data)
        setSuccessMsg(`Registration successful! Your application is pending admin approval. Referral Code assigned: ${referralCode}`)
        setFullName('')
        setEmail('')
        setPhone('')
      }
    } catch (err: any) {
      console.error('Catch Error:', err)
      setErrorMsg('An error occurred: ' + (err.message || 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-200">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Software Sales Partner Program
            </h1>
          </div>
          <a href="#register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Join as Sales Partner
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 text-center bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-indigo-100 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Global Partner Network & Verification System
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Earn High Commissions Selling <span className="text-indigo-600">Top Software Products</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join our exclusive partner network, bring clients to our premium software solutions, and earn attractive recurring commissions with verified secure payouts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">High Payouts</h4>
                <p className="text-xs text-slate-500">Up to 25% commission</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><ShieldCheck className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Secure Approval</h4>
                <p className="text-xs text-slate-500">Verified partner network</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 bg-violet-50 text-violet-600 rounded-xl"><Users className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Real-time Wallet</h4>
                <p className="text-xs text-slate-500">Track earnings instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {errorMsg && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium text-center">
            {errorMsg}
          </div>
        </div>
      )}

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-indigo-600" /> Available Software Products & Pricing
            </h3>
            <p className="text-sm text-slate-500 mt-1">Explore our high-converting software catalog available for promotion.</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No products found in database.</p>
              </div>
            ) : (
              products.map((prod, idx) => {
                const sampleImages = [
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60"
                ]
                const imgUrl = sampleImages[idx % sampleImages.length]

                return (
                  <div key={prod.id || idx} className="bg-white rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition duration-300 flex flex-col justify-between overflow-hidden group">
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={imgUrl} 
                        alt={prod.name || 'Product'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                        {prod.commission_rate || '20%'} Commission
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900">{prod.name}</h4>
                      <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-2">{prod.description}</p>
                    </div>
                    <div className="p-6 pt-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Price</span>
                        <span className="text-2xl font-extrabold text-slate-900">${prod.price}</span>
                      </div>
                      <a 
                        href="#register" 
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition"
                      >
                        Promote Now
                      </a>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </section>

      {/* Registration Section */}
      <section id="register" className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-amber-500" /> Apply as a Sales Partner
            </h3>
            <p className="text-sm text-slate-500 mt-1">Submit your application to join our partner program.</p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-center font-medium text-sm leading-relaxed">
              {successMsg}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition text-slate-900"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition text-slate-900"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition text-slate-900"
                placeholder="+94 77 123 4567"
              />
            </div>
            <button
              type="button"
              onClick={handleRegister}
              className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Submit Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Software Sales Partner Program. All rights reserved.</p>
      </footer>
    </div>
  )
}