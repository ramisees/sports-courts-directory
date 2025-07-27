import type { Metadata } from 'next'
import './globals.css'
import Navigation from '../../components/ui/Navigation'
import { montserrat, openSans } from './fonts'

export const metadata: Metadata = {
  title: 'Courty - Find and Book Sports Courts',
  description: 'Discover and book sports courts near you with AI-powered recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className={`bg-primary text-text-primary font-body`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
