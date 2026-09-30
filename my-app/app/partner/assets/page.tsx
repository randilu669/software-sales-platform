'use client'

import { useState } from 'react'
import { Download, Copy, Check, FileText, Image as ImageIcon } from 'lucide-react'

export default function MarketingAssets() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const swipeFiles = [
    {
      title: "High-Converting Email Swipe #1",
      content: "Hi [Name],\n\nI recently found this incredible AI automation and software suite that completely streamlines business workflows and saves hours of manual work. Thought you'd love to check it out: [Referral Link]\n\nBest,\n[Your Name]"
    },
    {
      title: "Social Media Hook (LinkedIn / Twitter)",
      content: "Want to scale your business operations without hiring extra staff? 🚀 Check out this elite software sales suite built with cutting-edge tools. Grab your access here: [Referral Link] #Automation #Software #Business"
    }
  ]

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Marketing & Creative Assets</h1>
        <p className="text-slate-500 text-sm mb-8">Download professional banners, copy swipe files, and social media hooks to boost your referrals.</p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Swipe Files & Email Templates
            </h2>
            <div className="space-y-4">
              {swipeFiles.map((swipe, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sm text-slate-800">{swipe.title}</h3>
                    <button 
                      onClick={() => handleCopy(swipe.content, idx)}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-1"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedIndex === idx ? 'Copied!' : 'Copy Text'}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-600 font-mono whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-100">
                    {swipe.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-indigo-600" /> Promotional Banners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 rounded-2xl text-white flex flex-col justify-between h-40">
                <div>
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-bold">Banner 1 (1200x627)</span>
                  <h3 className="font-extrabold text-lg mt-3">Enterprise Software Suite</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs underline cursor-pointer hover:opacity-80">Download Banner Asset</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-2xl text-white flex flex-col justify-between h-40">
                <div>
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-bold">Banner 2 (1080x1080)</span>
                  <h3 className="font-extrabold text-lg mt-3">High Commission Sales Partner</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs underline cursor-pointer hover:opacity-80">Download Banner Asset</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}