import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function MainLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-6 px-24 bg-gray-50">
        {children}
      </main>

      <Footer />
    </div>
  )
}
