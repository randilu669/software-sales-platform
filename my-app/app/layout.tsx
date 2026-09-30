import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Software Sales Partner Program',
  description: 'Global software sales and referral network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">
        <Navbar />
        {children}
      </body>
    </html>
  )
}