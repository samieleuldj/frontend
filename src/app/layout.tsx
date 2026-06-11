import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TrackingPixels from '@/components/layout/TrackingPixels'

const cairo = Cairo({ subsets: ['arabic', 'latin'] })

export const metadata: Metadata = {
  title: 'كونفور ديزاد - Confort DZ | منتجات الراحة اليومية',
  description: 'المتجر الأول في الجزائر لمنتجات الراحة اليومية. حزام الظهر، وسادة السيارة، وسادة النوم الطبية. الدفع عند الاستلام والتوصيل لـ 58 ولاية.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${cairo.className} flex flex-col min-h-screen`}>
        <TrackingPixels />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
